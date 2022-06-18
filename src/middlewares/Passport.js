var localStrategy = require('passport-local');
var googleStrategy = require('passport-google-oauth20');
const userController = require('../controllers/Users.controller.js');
const fedController = require('../controllers/Fed.controller.js');
const Bcrypt = require('../helpers/Bcrypt.js');
const { GOOGLE } = require("../config/config.js");

const strategies = {
    local: (username, password, cb) => {
        return new Promise((resolve, reject) =>{
            new localStrategy(function verify(username, password, cb){
                userController.getByUsername(username)
                .then(data => {
                    Bcrypt.compare(data.password, password)
                    .then((valid) => valid ? resolve(row) : reject())
                    .catch(err => reject(err))
                })
                .catch(err => reject(err))
            })
        }) 
    }, 

    google: async function(){
        
            new googleStrategy({
                clientID: GOOGLE.CLIENT,
                clientSecret: GOOGLE.SECRET,
                callbackURL: 'http://localhost:5000/oauth2/redirect/google',
                scope: ['profile'],
                state: true
            },
            async function verify(accessToken, refreshToken, profile, cb){
                let err, data = await fedController.get({
                    provider: 'https://accounts.google.com', 
                    subject: profile.id
                });
                if(err) reject(cb(err))
                if(!data){
                   userController.create({username: profile.displayName})
                   .then(data => {
                        return fedController.create({
                            _id: data._id,
                            provider: 'https://accounts.google.com',
                            subject: profile.id
                        })
                   })
                   .then(fedData => resolve(cb(null, fedData)))
                } else {
                    let fedData, err = await userController.getById(data._id)
                    if(err) reject(cb(err))
                    if(!fedData) resolve(cb(null, false))
                    return resolve(cb(null, fedData))
                } 
            })
    }
}

module.exports = strategies;