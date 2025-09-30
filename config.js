// Microsoft 365 Email Configuration
module.exports = {
    fromEmail: process.env.EMAIL_USER || 'info@raccordmep.co.uk',
    fromPassword: process.env.EMAIL_PASSWORD || 'Raccord50!',
    smtpServer: process.env.SMTP_SERVER || 'smtp.office365.com',
    smtpPort: parseInt(process.env.SMTP_PORT || '587', 10)
};
