const mongoose = require('mongoose');
const {Schema} = mongoose.Schema;

const questionSchema = new Schema({
    text: {type: String, required: true},
    type: {type: String, enum: ['singleChoice', 'multipleChoice', 'textInput'], required: true},
    answers: [{text: String, value: String}]
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
