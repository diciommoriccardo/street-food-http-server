var Users = require('../models/Users.js');
var Bcrypt = require('../helpers/Bcrypt.js');

const userController = {
    // login: (req) => {
    //     return new Promise((resolve, reject) => {
    //         Users.findOne(req.body.username)
    //         .then(data => {
    //             Bcrypt.compare(req.body.password, data.password)
    //             .then((valid) => valid ? resolve(row) : reject())
    //             .catch(err => reject(err))
    //         })
    //     })
    // },

    signUp: (req) => {
        return new Promise((resolve, reject) => {
            Bcrypt.getHashedPassword(req.body.password)
            .then(hash => {
                req.body.password = hash;
                return new Users(req.body).save()
            })
            .then(data => resolve(data))
            .catch(err => reject(err))
        })
    },

    getByUsername: (username) => {
        return new Promise((resolve, reject) => {
            Users.findOne(username)
            .then(data => resolve(data))
            .catch(err => reject(err))
        })
    },

    create: (req) => {
        return new Promise((resolve, reject) => {
            new Users(req).save()
            .then(data => resolve(data))
            .catch(err => reject(err))
        })
    },

    getById: (_id) => {
        return new Promise((resolve, reject) => {
            Users.findOne(_id)
            .then(data => resolve(data))
            .catch(err => reject(err))
        })
    }
}

module.exports = userController;