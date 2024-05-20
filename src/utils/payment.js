require("dotenv").config()
const nodemailer = require("nodemailer")

async function sendEmailWithQR(email, amount) {
    try 
    {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false, 
            auth: {
                user: process.env.USERK,
                pass: process.env.PASS,
            },
        })

        const htmlContent = `
            <p>Dear Customer,</p>
            <p>This email serves as a reminder for your recent order payment.</p>
            <p>The total amount due is <b> ₹${amount}</b>.</p>
            <p>Scan the QR code below or click the product image to access the secure payment portal:</p>
            <img src="cid:uniqueImageId" alt="Payment QR Code" style="width: 300px; height: 500px;text-align : centre" />
            <br />
            <p>Please note: Your order will not be shipped until your payment is received in full.</p>
            <p>Thank you for your business!</p>
            <p>Sincerely,</p>
            <p>The Upskill  Team</p>
        `

        const mailOptions = {
            from: {
                name: "UrbanGo",
                address: process.env.EMAIL,
            },
            to: email,
            subject: "Payment Details",
            html: htmlContent,
            attachments: [
                {
                    filename: 'QR.jpeg',
                    path : "src/assets/QR.jpeg",
                    cid: "uniqueImageId"
                }
            ],
        }

        const info = await transporter.sendMail(mailOptions)
        console.log("Email sent successfully! Message ID:", info.messageId)
    } 
    catch(error)
    {
        console.error("Error sending email:", error)
    }
}

module.exports = sendEmailWithQR
