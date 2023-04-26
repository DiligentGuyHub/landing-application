const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Question = require("./models/question");
const UserAnswer = require("./models/userAnswer");
const User = require("./models/user");
const {checkIfUserExists, createUser} = require('./services/userService');
const {getUserDataFromAnswers, getQuestionById, getAnswerById} = require('./services/questionService');
const {insertUserAnswers, parseUserAnswers} = require('./services/userAnswerService');
const {sendEmail} = require('./services/emailService');
const config = require('./config.json');
const seedModule = require('./data/seed');

const mongo_uri = process.env.MONGO_URI || config.connectionString;
mongoose.connect(mongo_uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async () => {
        console.log('Connected to MongoDB');
        const questionsCount = await Question.countDocuments();
        if (!questionsCount) {
            seedModule.seed();
        }
    })
    .catch(err => console.error('Error connecting to MongoDB', err));

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/questions/', async (req, res) => {
    try {
        const {answers} = req.body;
        const userAnswers = parseUserAnswers(answers);
        const {userName, userEmail, userAge} = await getUserDataFromAnswers(userAnswers);
        const userExists = await checkIfUserExists(userEmail);

        if (!userExists) {
            const user = await createUser(userEmail, userName, userAge);
            console.log(user);
            userAnswers.map(answer => answer.user = user.userId);
            await insertUserAnswers(userAnswers);
            await sendEmail(userEmail);
            res.status(200).json({user});
        } else {
            console.log('user was not created');
            res.status(409).json({
                message: "The user already exists."
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while saving user answers.'});
    }
});

app.get('/api/questions/', async (req, res) => {
    try {
        const questions = await Question.find({isActive: true});
        if (!questions) {
            return res.status(404).json({message: 'Questions not found'});
        }
        res.json({questions});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});
app.get('/api/user-answers/', async (req, res) => {
    try {
        const userAnswers = await UserAnswer.find().lean();
        const users = await User.find();
        const usersWithAnswers = await Promise.all(users.map(async (user) => {
            const answersByUser = userAnswers.filter(answer => answer.user === user.userId);
            const answers = await Promise.all(answersByUser.map(async (answer) => {
                const question = await getQuestionById(answer.question);
                const response = await Promise.all(answer.response.map(async (userResponse) => {
                    const responseObject = await getAnswerById(question, userResponse);
                    return responseObject ? responseObject.text : undefined;
                }));
                return {
                    question: (await getQuestionById(answer.question))?.text,
                    response: response.filter(r => r !== undefined),
                };
            }));
            return {
                id: user.userId,
                name: user.name,
                email: user.email,
                age: user.age,
                answers: answers.filter(a => a.response.length > 0),
            };
        }));

        res.status(200).json({usersWithAnswers});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});

app.get('/', (req, res) => {
    return res.status(200).json({message: 'Server API is available'});
})

app.listen(4000, () => {
    console.log('Running on http://localhost:4000');
})