var express = require('express');
var passport = require('passport');
const userController = require('../controllers/Users.controller.js');
const router = express.Router();
const jwtHelper = require('../helpers/jwt.js');


router.post("/login", passport.authenticate('local'), (req, res) => {
  console.log(req.user);  
  res.status(200).json({"message": "okay"});
});

router.post("/signup", (req, res) => {
    userController.signUp(req)
    .then(data => res.status(201).json(data))
    .catch(err => res.status(500).json(err))
});

router.get("/login/google", passport.authenticate('google', {
    scope: ["profile", "email"],
  }));
router.get('/oauth2/redirect/google', passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }), function(req, res) {
    res.status(200).json({"message":"okay"});
});

router.get("/logout", (req, res) => {
    req.session.destroy(function () {
      res.clearCookie("connect.sid");
      res.status(200).send("/login");
    });
  });



module.exports = router;