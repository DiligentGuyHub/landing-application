const nodemailer = require('nodemailer');
const config = require('../config.json');

const transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: {
        user: config.emailProviderLogin,
        pass: config.emailProviderPassword
    }
})

const mailOptions = (email) => {
    return {
        from: config.emailProviderLogin,
        to: email,
        subject: 'Спасибо за участие в опросе!',
        html: `
        <h1>Спасибо за участие в опросе!</h1>
        <p>Предъявите Купон в любом фирменном магазине Коммунарка и получите скидку 5% на покупку!</p>
        <img src="https://drive.google.com/uc?export=view&id=1Mostd3saZBR6ag6AvotlNUVYvlx074sB" alt="coupon"/>
        `
    };
};

const sendEmail = async (email) => {
    if (config.emailEnabled) {
        const options = mailOptions(email);
        await transporter.sendMail(options, (error, info) => {
            if (error) {
                console.log(error);
                return false;
            } else {
                console.log('Email sent: ' + info.response);
                return true;
            }
        });
    } else {
        console.log('Email dispatch disabled');
    }
}

module.exports = {
    sendEmail
}