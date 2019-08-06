var express = require('express');
var User = require('../models/users');
var router = express.Router();

//get all users
router.get('/', (req, res) => {
  User.find((err, user) => {
    if (err)
      console.log(err);
    else
      res.json(user);
  });
});

//get user by id
router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err)
      console.log(err);
    else
      res.json(user);
  });
});

//add new user
router.post('/add', (req, res) => {
  var user = new User(req.body);
  user.save()
      .then(user => {
        res.status(200).json({'user': 'Added successfully'});
      })
      .catch(err => {
        res.status(400).send('Failed to create new record');
      });
});

//update user info by id
router.post('/update/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (!user)
      return next(new Error('Could not load Document'));
    else {
      user.userName = req.body.userName;
      user.password = req.body.password;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
      user.phoneNumber = req.body.phoneNumber;
      user.address = req.body.address;
      user.location = req.body.location;
      user.afm = req.body.afm;

      user.save().then(user => {
        res.json('Update done');
      }).catch(err => {
        res.status(400).send('Update failed');
      });
    }
  });
});

//delete user by id
router.get('/delete/:id', (req, res) => {
  User.findByIdAndRemove({_id: req.params.id}, (err, user) => {
    if (err)
      res.json(err);
    else
      res.json('Removed successfully');
  });
});

module.exports = router;
