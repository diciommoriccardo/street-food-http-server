const jwt = require('jsonwebtoken');
const {JWT} = require('../config/config.js');

const jwtHelper = {
    signAccessToken: (payload) => {
        return jwt.sign( payload, JWT.SECRET_KEY, { expiresIn: JWT.EXPIRES_IN });
    },

    verify: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, JWT.SECRET_KEY, (error, verified) => {
                error ? reject(error) : resolve(verified);
            });
        });
    },
};

module.exports = jwtHelper;