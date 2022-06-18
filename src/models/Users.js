const mongoose = require('mongoose');

const Users = mongoose.model("Users", mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    username: {
        type: String, 
        unique: true
    },
    user_id: String
}))

module.exports = Users;