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

const getQuestionById = async (questionId) => {
    try {
        return await Question.findById(questionId);
    } catch (error) {
        console.error(error);
    }
}

const getAnswerById = async (question, answerId) => {
    try {
        return question.answers.find(a => String(a._id) === answerId);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {getUserDataFromAnswers, getQuestionById, getAnswerById};