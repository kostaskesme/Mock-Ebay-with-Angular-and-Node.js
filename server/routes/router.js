var express = require('express');
var router = express.Router();
var User = require('../models/users');
var authController = require('../controller/authenticationController')


// GET route for reading data
router.get('/login', function (req, res, next) {
  return authController.login(req, res, next);
});

// GET route for reading data
router.get('/', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/templateLogReg/index.html'));
});

//POST route for updating data
router.post('/', function (req, res, next) {
  authController.registerLogin(req, res, next);
})

// GET route after registering
router.get('/profile', function (req, res, next) {
  authController.goToProfile(req, res, next);
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  authController.logout(req, res, next);
});

// GET route findByName
router.get('/findByName/:name', function (req, res, next) {
  authController.findByName(req, res, next);
});


module.exports = router;