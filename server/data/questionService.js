const Question = require('../models/question');

const getUserDataFromAnswers = async (userAnswers) => {
    const emailQuestionId = (await Question.findOne({field: 'email'}))._id;
    const nameQuestionId = (await Question.findOne({field: 'name'}))._id;
    const ageQuestionId = (await Question.findOne({field: 'age'}))._id;
    const userEmail = userAnswers.find(answer => answer.question === emailQuestionId.toString()).response;
    const userName = userAnswers.find(answer => answer.question === nameQuestionId.toString()).response;
    const userAge = userAnswers.find(answer => answer.question === ageQuestionId.toString()).response;
    return {userEmail, userName, userAge};
}

module.exports = {getUserDataFromAnswers};