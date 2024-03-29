// server.js

// require express framework and additional modules
var express = require('express'),
  app = express(),
  ejs = require('ejs'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  User = require('./models/user'),
  session = require('express-session');


// connect to mongodb
mongoose.connect('mongodb://localhost/test');

// set view engine for server-side templating
app.set('view engine', 'ejs');

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 60000 }
}));


// signup route with placeholder response
app.get('/signup', function (req, res) {
  res.send('coming soon');
});

// user submits the signup form
app.post('/users', function (req, res) {

  // grab user data from params (req.body)
  var newUser = req.body.user;

  // create new user with secure password
  User.createSecure(newUser.email, newUser.password, function (err, user) {
    res.send(user);
  });
});

// user submits the login form
app.post('/login', function (req, res) {

  // grab user data from params (req.body)
  var userData = req.body.user;

  // call authenticate function to check if password user entered is correct
  User.authenticate(userData.email, userData.password, function (err, user) {
    res.send(user);

    // redirect to user profile
    res.redirect('/profile');
  });
});

// listen on port 3000
app.listen(3000, function () {
  console.log('server started on locahost:3000');
});