const UserAnswer = require('../models/userAnswer');


const parseUserAnswers = (data, userId) => {
    return Object.entries(data).map(([questionId, response]) => ({
        user: userId,
        question: questionId,
        response,
    }));
}
const insertUserAnswers = async (userAnswers) => {
    return await UserAnswer.insertMany(userAnswers);
}

module.exports = {
    parseUserAnswers,
    insertUserAnswers
}