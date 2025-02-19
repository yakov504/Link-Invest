const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');

exports.sendEmail = async (req, res, next) => {
  if(process.env.NODE_ENV === 'production'){
    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      
      const { name, phone, category } = req.body;
      console.log('Received email data:', { name, phone, category });
      
      const mailMessage = {
      from: process.env.IF_GMAIL_EMAIL_USERNAME, 
      to: process.env.IF_GMAIL_EMAIL_USERNAME, // המייל של החברה
      subject: 'פרטי יצירת קשר חדשים',
      text:` שם: ${name}\nטלפון: ${phone}\nפעולה: ${category}`,
      };

      await sgMail.send(mailMessage);
      console.log('Email sent successfully');
      res.status(200).json({ success: true, message: 'המייל נשלח בהצלחה!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, message: 'שגיאה בשליחת המייל' });
    }
  }else{
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
      const { name, phone, category } = req.body;
      console.log('Received email data:', { name, phone, category });
      
      const mailMessage = {
      from: process.env.IF_GMAIL_EMAIL_USERNAME, 
      to: process.env.IF_GMAIL_EMAIL_USERNAME, // המייל של החברה
      subject: 'פרטי יצירת קשר חדשים',
      text:`שם: ${name}\nטלפון: ${phone}\nפעולה: ${category}`,
      };

      await transporter.sendMail(mailMessage);
        console.log('Email sent successfully via Nodemailer');

      res.status(200).json({ success: true, message: 'המייל נשלח בהצלחה!' });
    }catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, message: 'שגיאה בשליחת המייל' });
    }
    
  };
}



// const sgMail = require('@sendgrid/mail');
// const nodemailer = require('nodemailer');

// exports.sendEmail = async (req, res) => {
//   try {
//     const { name, phone, category } = req.body;
//     console.log('Received email data:', { name, phone, category });

//     const mailMessage = {
//       from: process.env.IF_GMAIL_EMAIL_USERNAME,
//       to: process.env.IF_GMAIL_EMAIL_USERNAME, // המייל של החברה
//       subject: 'פרטי יצירת קשר חדשים',
//       text: `שם: ${name}\nטלפון: ${phone}\nפעולה: ${category}`,
//     };

//     if (process.env.NODE_ENV === 'production') {
//       sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//       await sgMail.send(mailMessage);
//       console.log('Email sent successfully via SendGrid');
//     } else {
//       const transporter = nodemailer.createTransport({
//         host: process.env.EMAIL_HOST,
//         port: process.env.EMAIL_PORT,
//         auth: {
//           user: process.env.EMAIL_USERNAME,
//           pass: process.env.EMAIL_PASSWORD,
//         },
//         tls: {
//           rejectUnauthorized: false, // ✅ פתרון לשגיאת תעודה עצמית
//         },
//       });

//       await transporter.sendMail(mailMessage);
//       console.log('Email sent successfully via Nodemailer');
//     }

//     res.status(200).json({ success: true, message: 'המייל נשלח בהצלחה!' });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).json({ success: false, message: 'שגיאה בשליחת המייל' });
//   }
// };