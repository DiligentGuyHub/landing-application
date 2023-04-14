const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const dbUrl = 'mongodb://root:example@localhost:27017/mongodb?authSource=admin';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

app.use(cors());

app.post('/nextQuestion', (req, res) => {
    res.json({});
});

app.get('/', (req, res) => {
})

app.listen(4000, () => {
    console.log('Running on http://localhost:4000');
})