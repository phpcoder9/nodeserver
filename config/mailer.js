const nodemailer = require('nodemailer');
require('dotenv').config();

// Ensure EMAIL_SECURE is either a Boolean or a recognized string
const secureValue = process.env.EMAIL_SECURE === 'true' ? true : process.env.EMAIL_SECURE === 'false' ? false : process.env.EMAIL_SECURE;

const mail = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: secureValue, 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASSWORD, 
    },
});

module.exports = mail;