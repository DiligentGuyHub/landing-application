const mongoose = require("mongoose");
const dbUrl = 'mongodb://root:example@localhost:27017/mongodb?authSource=admin';
const Question = require('./models/question');

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

const questions = [
    {
        text: 'How are you?', type: 'singleChoice', answers: [
            {text: 'Great', value: '3'},
            {text: 'Okay', value: '2'},
            {text: 'Bad', value: '1'},
        ]
    },
    {
        text: 'What the weather today?', type: 'singleChoice', answers: [
            {text: 'Shiny', value: '4'},
            {text: 'Cloudy', value: '3'},
            {text: 'Rainy', value: '2'},
            {text: 'Snowy', value: '1'},
        ]
    }
];

async function seed() {
    await Question.collection.deleteMany({});

    await Question.collection.insertMany(questions);

    console.log('Database seeded successfully!');
    mongoose.disconnect();
}

seed();