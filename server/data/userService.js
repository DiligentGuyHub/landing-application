const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

const getUserByEmail = async (email) => {
    return await User.findOne({ email });
}

const checkIfUserExists = async (email) => {
    return (await getUserByEmail(email)) ? true : false;
}

const createUser = async (email, name, age) => {
    const userId = uuidv4();
    const newUser = new User({ userId, email, name, age });
    await newUser.save();
    return userId;
}

module.exports = {
    getUserByEmail,
    checkIfUserExists,
    createUser
}