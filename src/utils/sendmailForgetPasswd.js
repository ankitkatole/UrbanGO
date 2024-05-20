require("dotenv").config()
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service : "gmail",
    host : "smtp.gmail.com",
    post : 587,
    secure : false,
    auth: {
        user : process.env.USERK,
        pass : process.env.PASS
    }
})

async function sendEmail(email, subject, text){
    try
    {
        const mailOptions = {
            from : {
                name : "Fitness Webiste",
                address : process.env.EMAIL
            },
            to : email,
            subject : subject,
            text : text
        }

        const info = await transporter.sendMail(mailOptions)
        console.log("Email sent successfully : ", info.messageId)
    }   
    catch(err)
    {
        console.error("Error sending email : ",err)
    }
}

module.exports = sendEmail