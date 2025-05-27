import { NextResponse } from 'next/server';
import { Mailjet } from 'mailjet';
import sanitizeHtml from 'sanitize-html';

export async function POST(request: Request) {
  try {
    const { name, email, message, recaptchaToken } = await request.json();

    // Verify reCAPTCHA
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      { method: 'POST' }
    );
    const recaptchaData = await recaptchaResponse.json();
    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      return NextResponse.json({ message: 'reCAPTCHA verification failed' }, { status: 400 });
    }

    // Server-Side Validation and Sanitization
    if (!name || !email || !message) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Sanitize inputs to prevent XSS and injection attacks
    const sanitizedName = sanitizeHtml(name, { allowedTags: [], allowedAttributes: {} });
    const sanitizedEmail = sanitizeHtml(email, { allowedTags: [], allowedAttributes: {} });
    const sanitizedMessage = sanitizeHtml(message, { allowedTags: [], allowedAttributes: {} });

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return NextResponse.json({ message: 'Invalid email format' }, { status: 400 });
    }

    // Validate lengths
    if (sanitizedName.length > 50 || sanitizedMessage.length > 500) {
      return NextResponse.json({ message: 'Input length exceeded' }, { status: 400 });
    }

    // Initialize Mailjet
    const mailjet = new Mailjet({
      apiKey: process.env.MAILJET_API_KEY,
      apiSecret: process.env.MAILJET_SECRET_KEY,
    });

    // Send Email
    const response = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'crateng13@gmail.com', // Replace with your verified sender email
            Name: 'Christopher Rateng Portfolio',
          },
          To: [
            {
              Email: 'crateng13@gmail.com',
              Name: 'Christopher Rateng',
            },
          ],
          Subject: `New Contact Form Submission from ${sanitizedName}`,
          TextPart: `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\nMessage: ${sanitizedMessage}`,
          HTMLPart: `<h3>New Contact Form Submission</h3><p><strong>Name:</strong> ${sanitizedName}</p><p><strong>Email:</strong> ${sanitizedEmail}</p><p><strong>Message:</strong> ${sanitizedMessage}</p>`,
        },
      ],
    });

    if (response.body.Messages[0].Status === 'success') {
      return NextResponse.json({ message: 'Message sent successfully' });
    } else {
      return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}