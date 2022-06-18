var Users = require('../models/Users.js');
var Bcrypt = require('../helpers/Bcrypt.js');

const userController = {
    login: (req) => {
        return new Promise((resolve, reject) => {
            Users.findOne(req.body.username)
            .then(data => {
                Bcrypt.compare(req.body.password, data.password)
                .then((valid) => valid ? resolve(row) : reject())
                .catch(err => reject(err))
            })
        })
    },

    signUp: (req) => {
        return new Promise((resolve, reject) => {
            Bcrypt.getHashedPassword(req.body.password)
            .then(hash => {
                req.body.password = hash;
                return new Users.create(req.body)
            })
            .then(data => resolve(data))
            .catch(err => reject(err))
        })
    }
}

module.exports = userController;