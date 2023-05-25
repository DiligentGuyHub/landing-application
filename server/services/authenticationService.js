const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const config = require('../config.json');

const isValidCredentials = async (username, password) => {
    return await Admin.findOne({username, password});
}

const isUsernameUnique = async (username) => {
    const existingAdministrator = await Admin.findOne({username});
    const isUsernameUsed = existingAdministrator !== null;
    return !isUsernameUsed;
}

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    const secretKey = config.jwtSecretKey;
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({message: 'Token is invalid'});
        }
        req.user = decoded;
        next();
    });
};

module.exports = {
    isValidCredentials,
    isUsernameUnique,
    verifyToken
}