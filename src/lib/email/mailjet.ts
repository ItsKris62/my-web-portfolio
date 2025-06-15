import Mailjet from 'node-mailjet'
const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY!,
  process.env.MAILJET_API_SECRET!
)
export async function sendContactEmail(data: { name: string; email: string; message: string }) {
  return mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [{
      From: { Email: process.env.MAIL_FROM!, Name: 'Portfolio' },
      To: [{ Email: process.env.MAIL_TO! }],
      Subject: `New message from ${data.name}`,
      TextPart: data.message,
      HTMLPart: `<h3>From: ${data.email}</h3><p>${data.message}</p>`,
    }]
  })
}