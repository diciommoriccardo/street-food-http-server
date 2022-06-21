var Users = require('../models/Users.js');
var Bcrypt = require('../helpers/Bcrypt.js');


const userController = {
    signUp: (req) => {
        return new Promise((resolve, reject) => {
            Users.register(new Users(req.body), req.body.password)
            .then(user => user.save())
            .then(data => resolve(data))
            .catch(err => reject(err))
        })
    },

    getByEmail: ({email: email}) => {
        return new Promise((resolve, reject) => {
            Users.findOne({email})
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

    getById: ({id: id}) => {
        return new Promise((resolve, reject) => {
            Users.findOne({id})
            .then(data => resolve(data))
            .catch(err => reject(err))
        })
    }
}

module.exports = userController;