const mongoose = require('mongoose');
const {DATABASE} = require('../config/config.js');

const uri = `mongodb+srv://${DATABASE.USER}:${DATABASE.PASS}${DATABASE.CLUSTER_SHARD}`;

class Mongo{
    constructor(){
        mongoose.connect(uri, {maxPoolSize: 20})
        .then(() => console.log("Mongo connect succesfully"))
        .catch(err => console.log(err))
    }
} 

module.exports = Mongo;