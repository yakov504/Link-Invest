// const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

exports.sendEmail = async (req, res, next) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const { name, phone, category } = req.body;
    console.log('Received email data:', { name, phone, category });

    const mailMessage = {
      from: process.env.IF_GMAIL_EMAIL_USERNAME, 
      to: process.env.IF_GMAIL_EMAIL_USERNAME, // המייל של החברה
      subject: 'פרטי יצירת קשר חדשים',
      text: `שם: ${name}\nטלפון: ${phone}\nפעולה: ${category}`,
    };

    await sgMail.send(mailMessage);
    console.log('Email sent successfully');
    res.status(200).json({ success: true, message: 'המייל נשלח בהצלחה!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'שגיאה בשליחת המייל' });
  }
};
