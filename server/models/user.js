const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    id: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    age: {type: Number, required: true}
});

const Question = mongoose.model('User', userSchema);

module.exports = Question;
