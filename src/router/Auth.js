var express = require('express');
var passport = require('passport');
const userController = require('../controllers/Users.controller.js');
const strategies = require('../middlewares/Passport.js');

const router = express.Router();

router.post("/login", passport.authenticate(strategies.local), (req, res) => {
    userController.login(req)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
});

router.post("/signup", (req, res) => {
    userController.signUp(req)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
});

router.get("/login/google", passport.authenticate(strategies.google));
router.get('/oauth2/redirect/google', passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }), function(req, res) {
    res.redirect('/');
});


module.exports = router;