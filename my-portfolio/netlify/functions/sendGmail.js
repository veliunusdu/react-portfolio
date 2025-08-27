import nodemailer from 'nodemailer'

// This Netlify function expects the following environment variables to be set in Netlify:
// GMAIL_USER (your Gmail address), GMAIL_PASS (an app password), GMAIL_TO (recipient address)

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' }

  try {
    const data = JSON.parse(event.body)
    const { name, email, message } = data

    if (!name || !email || !message) {
      return { statusCode: 400, body: 'Missing fields' }
    }

    // Use Gmail SMTP - app password recommended
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    })

    const mailOptions = {
      from: `${name} <${email}>`,
      to: process.env.GMAIL_TO || process.env.GMAIL_USER,
      subject: `New contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    }

    await transporter.sendMail(mailOptions)

    return { statusCode: 200, body: 'Message sent' }
  } catch (err) {
    console.error('sendGmail error', err)
    return { statusCode: 500, body: 'Server error' }
  }
}
