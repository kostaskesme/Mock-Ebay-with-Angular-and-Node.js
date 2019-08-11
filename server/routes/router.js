var express = require('express');
var router = express.Router();
var authController = require('../controller/authenticationController')
var auctionController = require('../controller/auctionController')
var usersController = require('../controller/usersController')


// GET route for reading data
router.post('/login', function (req, res, next) {
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

// GET route getByName
router.get('/getByName/:name', function (req, res, next) {
  authController.getByName(req, res, next);
});

//Users Controllers
router.get('/users', function (req, res) {
  usersController.getAllUsers(req, res);
});

router.get('/users/:id', function (req, res) {
  usersController.getUsersById(req, res);
});

router.post('/users/register', function (req, res) {
  usersController.addUser(req, res);
});

router.post('/users/update/:id', function (req, res) {
  usersController.updateUserById(req, res);
});

router.get('/users/delete/:id', function (req, res) {
  usersController.deleteUserById(req, res);
});

//Auction Controllers


router.post('/newAuction', function (req, res, next) {
  auctionController.createAuction(req, res, next);
});

router.get('/getAuction/:id', function (req, res, next) {
  auctionController.getAuctionById(req, res, next);
});

router.get('/getAuction', function (req, res, next) {
  auctionController.getAllAuctions(req, res, next);
});

router.post('/updateAuction/:id', function (req, res) {
  auctionController.updateAuctionById(req, res);
});

module.exports = router;