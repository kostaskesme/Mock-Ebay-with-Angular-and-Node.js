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
      res.status(400).send({ found: false, message: `User with id:${req.params.id} not found!` });
      console.log(err);
    }
    else
      res.status(200).json({ found: true, User: user });
  });
}



exports.findByUsername = function (username, cb) {
  // console.log('controller', username);
  User.findOne({ username: username })
    .exec(function (err, user) {
      if (err) {
        return cb(err, null);
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return cb(err, null);
      }
      else {
        return cb(null, user);
      }
      // bcrypt.compare(password, user.password, function (err, result) {
      //   if (result === true) {
      //     return callback(null, user);
      //   } else {
      //     return callback(err);
      //   }
      // })
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
      console.log('error', err);
      res.status(400).send({ register: false, message: 'Error registering user' });
    });
}

exports.approveUserById = function (req, res) {
  User.findById(req.body.id, (err, user) => {
    if (!user) {
      res.status(400).send({ found: false, message: `User with id:${req.body.id} not found!` });
      console.log(err);
    }
    else {
      user.approved = true;
      user.save().then(user => {
        res.json({ found: true, message: 'User approved!' });
      }).catch(err => {
        res.status(400).send('Update failed');
        console.log(err);
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
