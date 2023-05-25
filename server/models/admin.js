const mongoose = require('mongoose');
const {Schema} = mongoose;

const adminSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

module.exports = mongoose.models.Admin || mongoose.model('Admin', adminSchema);