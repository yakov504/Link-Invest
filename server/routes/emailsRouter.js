const express = require('express');
const emailController = require('../controller/emailController');

const router = express.Router();

// הגדרת המסלול לשליחת המייל
router.post('/send-mail', emailController.sendEmail);

module.exports = router;


