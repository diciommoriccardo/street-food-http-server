'use strict';
const googleStrategy = require('../config/strategies/google.js');
const userController = require('../controllers/Users.controller.js');
var LocalStrat = require('passport-local');
const Users = require('../models/Users.js');

module.exports = function(passport) {
    passport.serializeUser((User, done) => {
        done(null, User.id);
      });
      
      passport.deserializeUser(async (id, done) => {
        const currentUser = await userController.findOne({ id });
        done(null, currentUser);
      });
    passport.use(googleStrategy);
    passport.use(new LocalStrat(Users.authenticate()));
};