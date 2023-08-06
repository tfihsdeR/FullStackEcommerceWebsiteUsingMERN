const nodeMailer = require("nodemailer")

const sendEmail = async options => {
    const transporter = nodeMailer.createTransport({
        service: process.env.HOST,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const message = {
        from: process.env.SMTP_FROM_EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(message)
}

module.exports = sendEmail