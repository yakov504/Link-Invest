const nodemailer = require('nodemailer');

const sendEmail = async options => {
   try{
      // 1. create a transporter 
      const transporter = nodemailer.createTransport({
         host: process.env.EMAIL_HOST,
         port: process.env.EMAIL_PORT,
         auth:{
         user: process.env.EMAIL_USERNAME,
         pass: process.env.EMAIL_PASSWORD
      },
      tls: {
         rejectUnauthorized: false, // ✅ פתרון לשגיאת תעודה עצמית
      },

      })
            // בדיקת חיבור לשרת
         await transporter.verify();
         console.log("✅ Email server is ready to take messages");

         // if i went use in gmail activate in gmail 'les secure app' option
      //2.defind the email options
      const mailOption = {
         from: 'Link Invest development team <yydevlink@gmail.com>',
         to: options.email,
         subject: options.subject,
         text: options.message,
         
      };

      //3.actually send the email
      await transporter.sendMail(mailOption)

   } catch (error) {
         console.error("❌ Error sending email:", error);
      }
   };
module.exports = sendEmail;