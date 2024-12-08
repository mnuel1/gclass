const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, 
    auth: {
        user: 'noreply@resiboph.site',
        pass: '2I/+DRv|'
    }
});

module.exports = transporter
