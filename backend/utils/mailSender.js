const nodemailer = require('nodemailer')

const mailSender = async (email, title, body) => {

    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })
        const info = await transporter.sendMail({
            from: 'Shubham Kumar Singh', // sender address
            to: `${email}`, // list of receivers
            subject: `${title}`, // Subject line
            html: `${body}`, // plain text body
        })
        console.log(info)
        return info;

    }
    catch (err) {
        console.log(err, "error occurred while sending message ")
    }

}

module.exports = mailSender;