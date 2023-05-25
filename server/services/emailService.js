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
        subject: 'Коммунарка',
        html: `
        <h1>Спасибо за участие в опросе!</h1>
        <h3 style="font-weight: normal;"><p>
        Компания "Коммунарка" и вся ее команда хотели бы выразить искреннюю благодарность каждому из вас за то, что уделили время и участвовали в нашей опросе. Ваше участие имеет огромное значение для нас, и мы ценим ваше внимание и отзывчивость.
        </h3></p>
        <p><h3><b>
        Мы дарим Вам скидку в 5% на любую покупку в нашем фирменном магазине. Просто покажите письмо на кассе и наслаждайтесь любимым вкусом!
        </b></h3></p>
        <img src="https://drive.google.com/uc?export=view&id=1Oe0HofGkHOcav_WOpgG44DI2VO_zNw3l" width="512" alt="coupon"/>
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