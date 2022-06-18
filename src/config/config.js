require('dotenv').config()

const SERVER = {
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 5000
}

const TARGET_SERVER = {
    HOST: process.env.TARGET_HOST || 'localhost',
    PORT: process.env.TARGET_PORT || 8080
}

const DATABASE = {
    USER: process.env.DATABASE_USER,
    PASS: process.env.DATABASE_PASS,
    CLUSTER_SHARD: process.env.DATABASE_CLUSTER_SHARD
};

module.exports =  {
    SERVER,
    TARGET_SERVER,
    DATABASE
}