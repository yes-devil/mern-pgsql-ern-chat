const nodemailer = require('nodemailer');
require("dotenv").config()

// 1. Create a transporter object using Gmail SMTP
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL,         // Your Gmail address
//         pass: process.env.EMAIL_APP_PASS      // Your 16-digit Google App Password
//     }
// });

// transporter.verify((err, success) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log("SMTP server is ready");
//     }
// });

// 3. Send the email
async function sendMail(email, regdToken) {
    console.log("sending email to ", email)
    const verificationLink = process.env.FRONTEND_DOMAIN + "/auth/verification/" + regdToken
    console.log("verification link is " ,verificationLink)
    try {
        // const info = await transporter.sendMail(
        //     {
        //         from: `"My Node App" ${process.env.EMAIL}`,
        //         to: email,            // Change to your target recipient
        //         subject: 'Hello from Node.js chat application! 🚀',
        //         text: 'This is a verification email sent from a Node.js script. If you did not initiated this, just ignore or report it by replying us',
        //         html: `<h2>Click to verify your email : </h2><br><a href="${verificationLink}"><button>Click here</button></a><p>`
        //     }
        // );
        console.log('Email sent successfully! to ', email );
        // console.log('Message ID:', info);
        return 200
    } catch (error) {
        console.log('Error occurred while sending email: ', email, "\nError is : ", error);
        return 500
    }
}

module.exports = sendMail