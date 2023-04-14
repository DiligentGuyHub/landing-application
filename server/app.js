const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Question = require("./models/question");
const app = express();

const dbUrl = 'mongodb://root:example@localhost:27017/mongodb?authSource=admin';

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

app.use(cors());

app.get('/questions/:orderId', async (req, res) => {
    const orderId = parseInt(req.params.orderId);
    try {
        const question = await Question.findOne({orderId: orderId});
        if (!question) {
            return res.status(404).json({message: 'Question not found'});
        }
        res.json({question});
    }
    catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
})
app.post('/nextQuestion', (req, res) => {
    res.json({});
});

app.get('/', (req, res) => {
})

app.listen(4000, () => {
    console.log('Running on http://localhost:4000');
})