var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const User = require('./server/models/users');
var cookieParser = require('cookie-parser');


const fs = require('fs')
const https = require('https');

const port = 3000;
const cert = {
  key: fs.readFileSync('./server/cert/server.key'),
  cert: fs.readFileSync('./server/cert/server.cert')
}

//connect to MongoDB
mongoose.connect('mongodb://localhost/tedMaster', { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });
var db = mongoose.connection;


//CORS Middleware
app.use(function (req, res, next) {
  //Enabling CORS
  res.header('Access-Control-Allow-Origin', 'https://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization,X-AUTHENTICATION, X-IP, Content-Type, Accept');
  next();
});

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




/*  PASSPORT SETUP  */

app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // express body-parser
app.use(passport.initialize());
app.use(passport.session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// passport.use(User.createStrategy());

passport.use(new LocalStrategy(
  function (username, password, done) {
    // console.log('LocalStrategy');
    // console.log(username);
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      // TODO
      // if (!user.validPassword(password)) {
      //   return done(null, false, { message: 'Incorrect password.' });
      // }
      //console.log(user);

      return done(null, user);
    });
  }
));

passport.serializeUser((user, done) => {
  // console.log('serializeUser');
  var sessionUser = { _id: user._id, username: user.username, email: user.email }

  done(null, sessionUser._id);
})
passport.deserializeUser(function (id, done) {
  console.log('deserializeUser');
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// serve static files from template
app.use(express.static(__dirname + '/src'));

// include routes
var routes = require('./server/routes/router');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

// listen on port 3000
https.createServer(cert, app).listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
