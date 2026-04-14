const nodemailer = require('nodemailer');
require('dotenv').config();

const config = process.env.SMTP_URL;
console.log('Config:', config);

try {
    const transporter = nodemailer.createTransport(config);
    console.log('Transporter created successfully');
} catch (error) {
    console.error('Error creating transporter:', error);
}
