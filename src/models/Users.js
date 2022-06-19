const mongoose = require('mongoose');
var localMongoStrat = require('passport-local-mongoose')

const Users = mongoose.model("Users", mongoose.Schema({
    id: {
        type: String,
        default: null,
      },
      email: {
        type: String,
        required: [true, "email required"],
        unique: [true, "email already registered"],
      },
      firstName: String,
      lastName: String,
      profilePhoto: String,
      password: String,
      source: { type: String, required: [true, "source not specified"] },
}).plugin(localMongoStrat))

module.exports = Users;