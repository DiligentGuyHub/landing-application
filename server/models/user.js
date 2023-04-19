const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    userId: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    age: {type: Number, required: true}
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
