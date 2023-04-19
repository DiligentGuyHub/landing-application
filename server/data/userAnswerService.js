const UserAnswer = require('../models/userAnswer');


const parseUserAnswers = (data) => {
    return Object.entries(data).map(([questionId, response]) => ({
        question: questionId,
        response
    }));
}
const insertUserAnswers = async (userAnswers) => {
    return await UserAnswer.insertMany(userAnswers);
}

module.exports = {
    parseUserAnswers,
    insertUserAnswers
}