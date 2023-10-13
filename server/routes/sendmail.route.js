"use strict";
const express = require('express');
const sendMail = express.Router();
const nodemailer = require('nodemailer');

// Define an API route to send an email
sendMail.post('/send-email', async (req, res) => {
    try {
        const { email } = req.body;
        const testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: 'nyah.block3@ethereal.email',
                pass: 'Q51QsA3w7U4febJsvp',
            }
        });

        const mailOptions = {
            from: 'Abhinav Verma <nyah.block3@ethereal.email>',
            to: email,
            subject: 'Welcome to our newsletter!',
            text: 'Thank you for subscribing to our newsletter.',
            html: "<b>Thank you for subscribing to our newsletter.</b>",
        };

        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
});

module.exports = { sendMail };
