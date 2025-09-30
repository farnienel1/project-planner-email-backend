// Microsoft 365 Email Configuration
module.exports = {
    email: {
        user: process.env.EMAIL_USER || 'info@raccordmep.co.uk',
        password: process.env.EMAIL_PASSWORD || 'Raccord50!',
        host: 'smtp.office365.com',
        port: 587
    },
    server: {
        port: process.env.PORT || 3000
    }
};
