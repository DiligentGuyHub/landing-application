const mongoose = require('mongoose');
const {Schema} = mongoose;

const answerSchema = new Schema({
    text: {type: String}
});

const questionSchema = new Schema({
    _id: {type: String},
    orderId: {type: Number, unique: true},
    text: {type: String, required: true},
    type: {type: String, enum: ['radio', 'checkbox', 'text', 'range'], required: true},
    field: {type: String, enum: ['name', 'email', 'age', 'frequency', 'gender', 'children', 'employment', 'none'], default: 'none'},
    answers: [answerSchema],
    regex: {type: String},
    regexMessage: {type: String},
    min: {type: Number},
    max: {type: Number},
    isActive: {type: Boolean, default: true}
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
