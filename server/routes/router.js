var express = require('express');
var router = express.Router();
var authController = require('../controller/authenticationController')
var auctionController = require('../controller/auctionController')
var usersController = require('../controller/usersController')
var messageController = require('../controller/messageController')
var passport = require('passport');
const User = require('../models/users');

// GET route for reading data
router.get('/', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/templateLogReg/index.html'));
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user) {
    if (err) {
      console.log('/login authenticate error', err);
      return next(err);
    }
    if (!user) {
      console.log('!user');
      return res.redirect('/login');
    }
    req.logIn(user, function (err) {
      if (err) {
        console.log('/login logIn error', err);
        return next(err);
      }
      //res.cookie('userid', { id: user.id, username: user.username, type: user.type, approved: user.approved }, { maxAge: 2592000000, encode: String }); // TODO
      //res.cookie('sessionID', res.sessionID, { maxAge: 2592000000 }); // TODO
      return res.send({ isLoggedIn: true, user });
    });
  })(req, res, next);
});

router.post('/register', (request, response) => {
  User.register(new User(request.body), request.body.password, function (err, user) {
    //console.log('inside Register');
    if (err) {
      console.log(err);
      return response.render('register');
    } else {
      passport.authenticate('local')(request, response, function () {
        response.send(true);
      });
    }
  });
});

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


//Users routers
router.get('/users', function (req, res) {
  usersController.getAllUsers(req, res);
});

router.get('/users/:id', function (req, res) {
  usersController.getUsersById(req, res);
});

router.post('/users/register', function (req, res) {
  console.log('router');
  usersController.addUser(req, res);
});

router.put('/users/approve', function (req, res) {
  usersController.approveUserById(req, res);
});

router.post('/users/update/:id', function (req, res) {
  usersController.updateUserById(req, res);
});

router.get('/users/delete/:id', function (req, res) {
  usersController.deleteUserById(req, res);
});


//Auction routers
router.post('/newAuction', function (req, res) {
  auctionController.createAuction(req, res);
});

router.get('/getAuction/:id', function (req, res) {
  auctionController.getAuctionById(req, res);
});

router.get('/getAuction', function (req, res, next) {
  auctionController.getAllAuctions(req, res, next);
});

router.get('/getAuctionsBySeller/:id', function (req, res) {
  auctionController.getAuctionsBySeller(req, res);
});

router.get('/startAuction/:id', function (req, res) {
  auctionController.startAuctionById(req, res);
});

router.get('/searchAuction/:option/:term', function (req, res) {
  auctionController.searchAuction(req, res);
});

router.post('/updateAuction/:id', function (req, res) {
  auctionController.updateAuctionById(req, res);
});

router.post('/bidAuction/:id', function (req, res) {
  auctionController.bidAuctionById(req, res);
});

router.get('/deleteAuction/:id', function (req, res) {
  auctionController.deleteAuctionById(req, res);
});

//Message routers

router.get('/getMessageSender/:id', function (req, res) {
  messageController.getAllMessagesBySender(req, res);
});

router.get('/getMessageReceiver/:id', function (req, res) {
  messageController.getAllMessagesByReceiver(req, res);
});

router.post('/postMessage', function (req, res) {
  messageController.postMessage(req, res);
});

router.get('/deleteMessage/:id', function (req, res) {
  messageController.deleteMessageById(req, res);
});

module.exports = router;
