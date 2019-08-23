var User = require('../models/users');
var usersController = require('../controller/usersController');
var passport = require('passport');
// exports.login2 = function (req, res, next) {
//     User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
//         if (error || !user) {
//             // var err = new Error('Wrong email or password.');
//             res.status(401).jsonp({ error: 'Wrong email or password.' });
//             // return next(res);
//             return res.send({ error: 'Wrong email or password.' });
//         } else {
//             req.session.userId = user._id;
//             res.status = 200;
//             return res.send({ isLoggedIn: true });
//         }
//     });

// }

// exports.login = function (username, password, done) {
//     usersController.findByUsername(username, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) { return done(null, false); }
//         if (user.password != password) { return cb(null, false); }
//         return done(null, user);
//     });
// }

// exports.registerLogin = function (req, res, next) {      USELESS?
//     // confirm that user typed same password twice
//     if (req.body.password !== req.body.passwordConf) {
//         var err = new Error('Passwords do not match.');
//         err.status = 400;
//         res.send("passwords dont match");
//         return next(err);
//     }

//     if (req.body.email &&
//         req.body.username &&
//         req.body.password &&
//         req.body.passwordConf) {

//         var userData = {
//             email: req.body.email,
//             username: req.body.username,
//             password: req.body.password,

//         }

//         User.create(userData, function (error, user) {
//             if (error) {
//                 return next(error);
//             } else {
//                 req.session.userId = user._id;
//                 return res.redirect('/profile');
//             }
//         });

//     } else if (req.body.logemail && req.body.logpassword) {
//         User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
//             if (error || !user) {
//                 var err = new Error('Wrong email or password.');
//                 err.status = 401;
//                 return next(err);
//             } else {
//                 req.session.userId = user._id;
//                 return res.redirect('/profile');
//             }
//         });
//     } else {
//         var err = new Error('All fields required.');
//         err.status = 400;
//         return next(err);
//     }
// }

exports.goToProfile = function (req, res, next) {

    User.findById(req.sessionID)
        .exec(function (error, user) {
            // console.log('find in profile');
            if (error) {
                return next(error);
            } else {
                // console.log(user);
                if (user === null) {
                    var err = new Error('Not authorized! Go back!');
                    err.status = 400;
                    return next(err);
                } else {
                    return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
                }
            }
        });
}

exports.logout = function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
}

exports.getByName = function (req, res, next) {
    User.findOne({ username: req.params.name })
        .exec(function (error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    var err = new Error('Not authorized! Go back!');
                    err.status = 400;
                    return next(err);
                } else {
                    return res.send(user);
                }
            }
        });
}