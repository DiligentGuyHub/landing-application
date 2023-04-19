const mongoose = require('mongoose');
const {Schema} = mongoose;

const userAnswerSchema = new Schema({
    user: {type: String, required: true},
    question: {type: Schema.Types.ObjectId, ref: 'Question', required: true},
    response: {type: [Schema.Types.Mixed]}
});

module.exports = mongoose.models.UserAnswer || mongoose.model('UserAnswer', userAnswerSchema);