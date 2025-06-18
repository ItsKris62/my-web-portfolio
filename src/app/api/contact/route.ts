import { NextResponse } from 'next/server';
import Mailjet from 'node-mailjet';
export async function POST(request: Request) {
try {
    const { token, ...data } = await request.json();
    // TODO: verify reCAPTCHA server-side using the token

    // Validate required fields
    if (!data.email || !data.name || !data.subject || !data.message) {
        return NextResponse.json(
            { success: false, error: 'Missing required fields' },
            { status: 400 }
        );
    }

    const mailjet = Mailjet.apiConnect(
        process.env.MAILJET_API_KEY!,
        process.env.MAILJET_SECRET_KEY!
    );

    const requestBody = {
        Messages: [
            {
                From: { Email: 'no-reply@your-domain.com', Name: 'Portfolio' },
                To: [{ Email: data.email, Name: data.name }],
                Subject: data.subject,
                TextPart: data.message,
            },
        ],
    };

    await mailjet.post('send', { version: 'v3.1' }).request(requestBody);
    return NextResponse.json({ success: true });
} catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
        { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
    );
}
}