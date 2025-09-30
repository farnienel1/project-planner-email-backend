const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Microsoft 365 SMTP Configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER || 'info@raccordmep.co.uk',
        pass: process.env.EMAIL_PASSWORD || 'Raccord50!'
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

// Verify connection configuration
transporter.verify(function(error, success) {
    if (error) {
        console.log('❌ SMTP Configuration Error:', error);
    } else {
        console.log('✅ SMTP Server is ready to take our messages');
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Project Planner Email Service is running',
        timestamp: new Date().toISOString()
    });
});

// Email sending endpoint
app.post('/send-email', async (req, res) => {
    try {
        const { to, subject, body, fromName = 'Raccord MEP' } = req.body;

        // Validate required fields
        if (!to || !subject || !body) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: to, subject, body'
            });
        }

        // Email options
        const mailOptions = {
            from: `"${fromName}" <${process.env.EMAIL_USER || 'info@raccordmep.co.uk'}>`,
            to: to,
            subject: subject,
            text: body,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background-color: #0d67ed; color: white; padding: 20px; text-align: center;">
                        <h1 style="margin: 0; font-size: 24px;">Raccord MEP</h1>
                        <p style="margin: 5px 0 0 0; font-size: 16px;">Project Planner</p>
                    </div>
                    <div style="padding: 20px; background-color: #f9f9f9;">
                        <h2 style="color: #0d67ed; margin-top: 0;">Weekly Schedule</h2>
                        <div style="white-space: pre-line; line-height: 1.6; color: #333;">
                            ${body.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                    <div style="background-color: #139cfe; color: white; padding: 15px; text-align: center; font-size: 14px;">
                        <p style="margin: 0;">This email was sent from the Raccord MEP Project Planner system</p>
                    </div>
                </div>
            `
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        
        console.log('✅ Email sent successfully:', {
            to: to,
            subject: subject,
            messageId: info.messageId
        });

        res.json({
            success: true,
            message: 'Email sent successfully',
            messageId: info.messageId
        });

    } catch (error) {
        console.error('❌ Email sending error:', error);
        
        res.status(500).json({
            success: false,
            error: 'Failed to send email',
            details: error.message
        });
    }
});

// Test endpoint
app.post('/test-email', async (req, res) => {
    try {
        const testEmail = {
            to: req.body.testEmail || 'test@example.com',
            subject: 'Test Email from Project Planner',
            body: 'This is a test email from the Raccord MEP Project Planner system. If you receive this, the email service is working correctly!',
            fromName: 'Raccord MEP Test'
        };

        const result = await transporter.sendMail({
            from: `"${testEmail.fromName}" <${process.env.EMAIL_USER || 'info@raccordmep.co.uk'}>`,
            to: testEmail.to,
            subject: testEmail.subject,
            text: testEmail.body
        });

        res.json({
            success: true,
            message: 'Test email sent successfully',
            messageId: result.messageId
        });

    } catch (error) {
        console.error('❌ Test email error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to send test email',
            details: error.message
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Project Planner Email Service running on port ${PORT}`);
    console.log(`📧 Using email: ${process.env.EMAIL_USER || 'info@raccordmep.co.uk'}`);
    console.log(`🌐 Health check: http://localhost:${PORT}/health`);
});
