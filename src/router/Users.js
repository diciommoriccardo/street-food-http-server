var express = require('express');
const userController = require('../controllers/Users.controller.js');

const router = express.Router();

router.post("/login", (req, res) => {
    userController.login(req)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
})

router.post("/signup", (req, res) => {
    userController.signUp(req)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
})

module.exports = router;