const mongoose = require('mongoose');
const {Schema, ObjectId} = mongoose;

const responseSchema = new Schema({
    user: {type: ObjectId, ref: 'User', required: true},
    question: {ObjectId, ref: 'Question', required: true},
    response: [{type: String}]
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
