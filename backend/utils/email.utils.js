const { Resend } = require("resend")
const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.EMAIL_FROM

exports.sendVerifyEmail = async (email, verifyLink) => {
    try {
        await resend.emails.send({
            from: FROM,
            to: email,
            subject: "Verify your email",
            html: `
            Click on this link to verify your email.
            It expires in 30 min
            <a href="${verifyLink}">Verify Email</a>
            `
        });
    } catch (error) {

    }
}