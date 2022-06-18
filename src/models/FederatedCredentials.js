var mongoose = require('mongoose');

const Fed = mongoose.model("Federated_credentials", mongoose.Schema({
    provider: String,
    subject: String,
}))

module.exports = Fed;