var User = require('../models/users');

//get all users
exports.getAllUsers = function (req, res) {
  User.find((err, user) => {
    if (err){
      res.send({ error: 'Could not get users'});
      console.log(err);
    }
    else
      res.json(user);
  });
}

//get user by id
exports.getUsersById = function (req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err){
      res.status(400).send({ error: `User with id:${req.params.id} not found!`});
      console.log(err);
    }
    else
      res.json(user);
  });
}

//add new user
exports.addUser = function (req, res) {
  var user = new User(req.body);
  user.save()
      .then(user => {
        res.status(200).json({'user': 'Added successfully'});
      })
      .catch(err => {
        res.status(400).send('Failed to create new record');
      });
}

//update user info by id
exports.updateUserById = function (req, res, next) {
  User.findById(req.params.id, (err, user) => {
    if (!user){
      res.status(400).send({ error: `User with id:${req.params.id} not found!`});
      console.log(err);
    }
    else {
      user.email = req.body.email;
      user.username = req.body.username;
      user.password = req.body.password;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.phoneNumber = req.body.phoneNumber;
      user.address = req.body.address;
      user.location = req.body.location;
      user.afm = req.body.afm;
      user.rating = req.body.rating;

      user.save().then(user => {
        res.json('Update done');
      }).catch(err => {
        res.status(400).send('Update failed');
      });
    }
  });
}

//delete user by id
exports.deleteUserById = function (req, res) {
  User.findByIdAndRemove({_id: req.params.id}, (err, user) => {
    if (err){
      res.status(400).send({ error: `User with id:${req.params.id} not found!`});
      console.log(err);
    }
    else
      res.json('Removed successfully');
  });
}
