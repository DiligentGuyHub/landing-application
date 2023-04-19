const User = require('../models/User');

const getUserByEmail = async (email) => {
    return await User.findOne({ email });
}

const checkIfUserExists = async (email) => {
    return (await getUserByEmail(email)) ? true : false;
}

const createUser = async (userId, email, name, age) => {
    const newUser = new User({ userId, email, name, age });
    return newUser.save();
}

module.exports = {
    getUserByEmail,
    checkIfUserExists,
    createUser
}