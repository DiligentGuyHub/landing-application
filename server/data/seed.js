const mongoose = require("mongoose");
const config = require('../config.json');
const Question = require('../models/question');
const questions = require('./questions.json');

const mongo_uri = process.env.MONGO_URI || config.connectionString;

const seed = async () => {
    mongoose.connect(mongo_uri, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log('[seed] Connected to MongoDB.')
        })
        .catch(err => console.error('[seed] Error connecting to MongoDB', err));

    await Question.deleteMany({});
    console.log('[seed] Existing documents removed successfully.');
    await Question.insertMany(questions);
    console.log('[seed] Questions seeded successfully.');
    mongoose.disconnect();
    console.log('[seed] Disconnected from MongoDB.');
};

module.exports = {
    seed,
};