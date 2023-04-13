const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const dbUrl = 'mongodb://localhost:27017/mongodb'; // replace with your database URL

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

// const QuestionSchema = new mongoose.Schema({
//     text: String,
//     options: [{
//         text: String,
//         value: String,
//     }],
// });
// const Question = mongoose.model('Question', QuestionSchema);

app.use(cors());

app.get('/', (req, res) => {
    res.json([
        {
            "id":"1",
            "title":"Album Review: When we all Fall asleep where do we go?"
        },
        {
            "id":"2",
            "title":"Book Review: How can we escape this labyrinth of suffering?"
        },
        {
            "id":"3",
            "title":"Documentary Review: How can we escape the rat race?"
        }
    ])
})

app.listen(4000, () => {
    console.log('Running on http://localhost:4000');
})