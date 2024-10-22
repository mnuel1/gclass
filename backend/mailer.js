const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, 
    auth: {
        user: 'nreplyedusync@resiboph.site',
        pass: 'P$P8s1?J'
    }
});

module.exports = transporter