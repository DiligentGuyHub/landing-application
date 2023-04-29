const mongoose = require("mongoose");
const config = require('../config.json');
const Question = require('../models/question');
const questions = require('./questions.json');

const mongo_uri = process.env.MONGO_URI || config.connectionString;

const seed = async () => {
    await Question.deleteMany({});
    console.log('[seed] Existing documents removed successfully.');
    await Question.insertMany(questions);
    console.log('[seed] Questions seeded successfully.');
};

module.exports = {
    seed,
};