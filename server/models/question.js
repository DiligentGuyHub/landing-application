const mongoose = require('mongoose');
const {Schema} = mongoose;

const answerSchema = new Schema({
    text: {type: String, required: true},
    value: {type: String, required: true}
});

const questionSchema = new Schema({
    orderId: {type: Number, required: true},
    text: {type: String, required: true},
    category: {type: String, enum: ['single', 'multiple', 'text', 'range'], required: true},
    field: {type: String, enum: ['firstname', 'lastname', 'email', 'age', 'frequency', 'gender', 'children', 'employment', 'none'], default: 'none'},
    answers: [answerSchema]
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
