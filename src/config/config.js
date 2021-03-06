require('dotenv').config()

const SERVER = {
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 5000,
    PORT_SECURE: process.env.PORT_SECURE || 5001,
    SESSION_SECRET: process.env.SESSION_SECRET
}

const TARGET_SERVER = {
    HOST: process.env.TARGET_HOST || 'localhost',
    PORT: process.env.TARGET_PORT || 8080
}

const DATABASE = {
    USER: process.env.DATABASE_USER,
    PASS: process.env.DATABASE_PASS,
    CLUSTER_SHARD: process.env.DATABASE_CLUSTER_SHARD
}

const GOOGLE = {
    CLIENT: process.env.GOOGLE_CLIENT_ID,
    SECRET: process.env.GOOGLE_SECRET
}

const JWT = {
    SECRET_KEY: process.env.ACCESS_TOKEN_SECRET,
    EXPIRES_IN: 10800,
}

module.exports =  {
    SERVER,
    TARGET_SERVER,
    DATABASE,
    GOOGLE,
    JWT
}