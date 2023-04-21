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

const getUsersWithAnswers = async(user, userAnswer) => {
    const userAnswers = await UserAnswer.find().lean();
    const users = await User.find();
    const usersWithAnswers = await Promise.all(users.map(async (user) => {
        const answersByUser = userAnswers.filter(answer => answer.user === user.userId);
        const answers = await Promise.all(answersByUser.map(async (answer) => {
            const question = await getQuestionById(answer.question);
            const response = await Promise.all(answer.response.map(async (userResponse) => {
                const responseObject = await getAnswerById(question, userResponse);
                return responseObject === undefined ? userResponse : responseObject.text;
            }));
            return {
                question: (await getQuestionById(answer.question))?.text,
                response: response,
            };
        }));
        return {
            id: user.userId,
            name: user.name,
            email: user.email,
            age: user.age,
            answers,
        };
    }));
    return usersWithAnswers;
}

module.exports = {
    parseUserAnswers,
    insertUserAnswers,
    getUsersWithAnswers
}