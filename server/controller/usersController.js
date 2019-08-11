var User = require('../models/users');

//get all users
exports.getAllUsers = function (req, res) {
  User.find((err, user) => {
    if (err) {
      res.status(400).send({ found: false, message: 'Could not get users' });
      console.log(err);
    }
    else
      res.status(200).json({ found: true, result: user });
  });
}

//get user by id
exports.getUsersById = function (req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(400).send({ error: `User with id:${req.params.id} not found!` });
    }
    else
      res.json(user);
  });
}

//add new user
exports.addUser = function (req, res) {
  var userFromRequest = new User(req.body);
  userFromRequest.save()
    .then(userFromdb => {
      res.status(200).json({ registered: true, userId: userFromdb._id });
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({ register: false, message:'Error registering user' });
    });
}

//update user info by id
exports.updateUserById = function (req, res, next) {
  User.findById(req.params.id, (err, user) => {
    if (!user) {
      res.status(400).send({ error: `User with id:${req.params.id} not found!` });
      console.log(err);
    }
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
}

//delete user by id
exports.deleteUserById = function (req, res) {
  User.findByIdAndRemove({ _id: req.params.id }, (err, user) => {
    if (err) {
      res.status(400).send({ error: `User with id:${req.params.id} not found!` });
      console.log(err);
    }
    else
      res.json('Removed successfully');
  });
}
