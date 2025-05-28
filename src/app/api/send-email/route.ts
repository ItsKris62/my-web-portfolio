import { NextResponse } from 'next/server';
import Mailjet from 'node-mailjet';
import sanitizeHtml, { IOptions } from 'sanitize-html';

// Input validation schemas
interface ContactFormData {
  name: string;
  email: string;
  message: string;
  recaptchaToken: string;
}

interface RequestData {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  recaptchaToken?: unknown;
}

interface MailjetResponse {
  body: {
    Messages: Array<{
      Status: string;
      Errors?: Array<{
        ErrorMessage: string;
      }>;
    }>;
  };
}

// Rate limiting store (in-memory for simplicity)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Simple rate limiting function
const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5;

  const record = rateLimitStore.get(ip);
  
  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
};

// Enhanced email validation with additional checks
const validateEmail = (email: string): boolean => {
  // Basic format validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  // Check basic format and length
  if (!emailRegex.test(email) || email.length > 254) {
    return false;
  }

  // Additional checks
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  
  const [localPart, domain] = parts;
  
  // Local part validation
  if (localPart.length === 0 || localPart.length > 64) return false;
  if (localPart.startsWith('.') || localPart.endsWith('.')) return false;
  if (localPart.includes('..')) return false;
  
  // Domain validation
  if (domain.length === 0 || domain.length > 255) return false;
  if (domain.startsWith('-') || domain.endsWith('-')) return false;
  
  return true;
};

// Sanitization options
const sanitizeOptions: IOptions = {
  allowedTags: [],
  allowedAttributes: {},
  disallowedTagsMode: 'discard',
  allowedSchemes: [],
  allowedSchemesByTag: {},
  allowedSchemesAppliedToAttributes: [],
};

// Verify reCAPTCHA
const verifyRecaptcha = async (token: string): Promise<boolean> => {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY is not configured');
      return false;
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    if (!response.ok) {
      throw new Error(`reCAPTCHA API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return data.success && (data.score >= 0.5 || data.score === undefined); // Handle v2 and v3
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
};

// Validate and sanitize input data
const validateAndSanitizeInput = (data: RequestData): { isValid: boolean; sanitizedData?: ContactFormData; error?: string } => {
  const { name, email, message, recaptchaToken } = data;

  // Check required fields
  if (!name || !email || !message || !recaptchaToken) {
    return { isValid: false, error: 'All fields are required' };
  }

  // Type validation
  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string' || typeof recaptchaToken !== 'string') {
    return { isValid: false, error: 'Invalid input types' };
  }

  // Sanitize inputs
  const sanitizedName = sanitizeHtml(name.trim(), sanitizeOptions);
  const sanitizedEmail = sanitizeHtml(email.trim().toLowerCase(), sanitizeOptions);
  const sanitizedMessage = sanitizeHtml(message.trim(), sanitizeOptions);
  const sanitizedToken = sanitizeHtml(recaptchaToken.trim(), sanitizeOptions);

  // Validate lengths
  if (sanitizedName.length === 0 || sanitizedName.length > 50) {
    return { isValid: false, error: 'Name must be between 1 and 50 characters' };
  }

  if (sanitizedMessage.length === 0 || sanitizedMessage.length > 1000) {
    return { isValid: false, error: 'Message must be between 1 and 1000 characters' };
  }

  // Validate email format
  if (!validateEmail(sanitizedEmail)) {
    return { isValid: false, error: 'Invalid email format' };
  }

  // Basic profanity/spam detection with more comprehensive patterns
  const suspiciousPatterns = [
    /\b(viagra|cialis|pharmacy)\b/i,
    /\b(casino|gambling|poker|lottery|jackpot)\b/i,
    /\b(crypto|bitcoin|investment|trading|profit)\b/i,
    /\b(loan|credit|debt|mortgage)\b/i,
    /\b(seo|backlink|ranking|traffic)\b/i,
    /\b(hack|hacking|password|account)\b/i,
    /(http|https|www\.)/i, // Block URLs
    /(.)\1{4,}/i, // Repeated characters (aaaaa)
    /[^\w\s@.-]/g, // Unusual special characters
  ];

  const combinedText = `${sanitizedName} ${sanitizedEmail} ${sanitizedMessage}`;
  const suspiciousScore = suspiciousPatterns.reduce((score, pattern) => {
    return score + (pattern.test(combinedText) ? 1 : 0);
  }, 0);

  // Block if multiple suspicious patterns detected
  if (suspiciousScore >= 2) {
    console.warn('Suspicious submission blocked:', {
      ip: 'redacted',
      patterns: suspiciousScore,
      timestamp: new Date().toISOString(),
    });
    return { isValid: false, error: 'Message contains inappropriate content' };
  }

  return {
    isValid: true,
    sanitizedData: {
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
      recaptchaToken: sanitizedToken,
    },
  };
};

// Send email via Mailjet with better error handling
const sendEmail = async (data: ContactFormData): Promise<{ success: boolean; error?: string }> => {
  try {
    const apiKey = process.env.MAILJET_API_KEY;
    const apiSecret = process.env.MAILJET_SECRET_KEY;
    const senderEmail = process.env.SENDER_EMAIL || 'crateng13@gmail.com';
    const recipientEmail = process.env.RECIPIENT_EMAIL || 'crateng13@gmail.com';

    if (!apiKey || !apiSecret) {
      return { success: false, error: 'Email service not configured' };
    }

    const mailjet = new Mailjet({
      apiKey,
      apiSecret,
    });

    // Create a more professional email template
    const timestamp = new Date();
    const emailData = {
      Messages: [
        {
          From: {
            Email: senderEmail,
            Name: 'Portfolio Contact Form',
          },
          To: [
            {
              Email: recipientEmail,
              Name: 'Christopher Rateng',
            },
          ],
          Subject: `Portfolio Contact: ${data.name} - ${timestamp.toLocaleDateString()}`,
          TextPart: `
Portfolio Contact Form Submission

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${data.name}
Email: ${data.email}
Submitted: ${timestamp.toLocaleString()}

Message:
${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This message was sent from your portfolio contact form.
Reply directly to this email to respond to ${data.name}.
          `.trim(),
          HTMLPart: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Portfolio Contact Form</title>
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">Portfolio Contact Form</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">New message received</p>
              </div>
              
              <div style="background: white; padding: 30px; border: 1px solid #e1e5e9; border-top: none; border-radius: 0 0 10px 10px;">
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                  <h2 style="margin: 0 0 15px 0; color: #495057; font-size: 18px;">Contact Information</h2>
                  <p style="margin: 8px 0;"><strong>Name:</strong> ${data.name}</p>
                  <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #667eea; text-decoration: none;">${data.email}</a></p>
                  <p style="margin: 8px 0;"><strong>Submitted:</strong> ${timestamp.toLocaleString()}</p>
                </div>
                
                <div>
                  <h3 style="margin: 0 0 15px 0; color: #495057; font-size: 16px;">Message:</h3>
                  <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
                    <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
                  </div>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e1e5e9; text-align: center;">
                  <a href="mailto:${data.email}?subject=Re: Your portfolio contact message" 
                     style="background: #667eea; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: 500;">
                    Reply to ${data.name}
                  </a>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 20px; color: #6c757d; font-size: 14px;">
                <p>This message was sent from your portfolio contact form.</p>
              </div>
            </body>
            </html>
          `,
        },
      ],
    };

    const response = await mailjet.post('send', { version: 'v3.1' }).request(emailData) as MailjetResponse;
    
    // Check response more thoroughly
    if (response.body?.Messages?.[0]?.Status === 'success') {
      return { success: true };
    } else {
      const errorMsg = response.body?.Messages?.[0]?.Errors?.[0]?.ErrorMessage || 'Unknown email error';
      return { success: false, error: errorMsg };
    }
    
  } catch (error) {
    console.error('Email sending error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Email service unavailable';
    return { success: false, error: errorMessage };
  }
};

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(/, /)[0] : request.headers.get('x-real-ip') || 'unknown';

    // Apply rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many contact form submissions, please try again later.' },
        { status: 429 }
      );
    }
    // Parse request body
    let requestData;
    try {
      requestData = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    // Validate and sanitize input
    const validation = validateAndSanitizeInput(requestData);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, message: validation.error },
        { status: 400 }
      );
    }

    const sanitizedData = validation.sanitizedData!;

    // Verify reCAPTCHA
    const isRecaptchaValid = await verifyRecaptcha(sanitizedData.recaptchaToken);
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { success: false, message: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }

    // Send email
    const emailResult = await sendEmail(sanitizedData);
    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error);
      return NextResponse.json(
        { success: false, message: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    // Log the full error for debugging
    console.error('Contact form API error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: false, message: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}