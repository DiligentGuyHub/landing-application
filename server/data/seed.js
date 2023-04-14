const mongoose = require("mongoose");
const dbUrl = 'mongodb://root:example@localhost:27017/mongodb?authSource=admin';
const Question = require('../models/question');
const questions = require('./questions.json');

const seed = async function () {
    await Question.deleteMany({});
    console.log('Existing documents removed successfully.');
    await Question.insertMany(questions);
    console.log('Questions seeded successfully.');
}

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB.')
    })
    .catch(err => console.error('Error connecting to MongoDB', err));

seed().then(() => {
    mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
});;