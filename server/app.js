const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Question = require("./models/question");
const app = express();

const dbUrl = 'mongodb://root:example@localhost:27017/mongodb?authSource=admin';

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

app.use(cors());
app.use(bodyParser.json());

app.get('/api/questions/:orderId', async (req, res) => {
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

app.post('/api/questions/', async (req, res) => {
    console.log(req.body);
    res.send('Data received');
});

app.get('/api/questions/', async (req, res) => {
    try {
        const questions = await Question.find({isActive: true});
        if (!questions) {
            return res.status(404).json({message: 'Questions not found'});
        }
        res.json({questions});
    }
    catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
})

app.get('/', (req, res) => {
    return res.status(200).json({message: 'Server API is available'});
})

app.listen(4000, () => {
    console.log('Running on http://localhost:4000');
})