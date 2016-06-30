var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var passport = require('passport');
var knex = require('./db/knex');
var cookieSession = require('cookie-session');

var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();

require('locus');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))
app.use('/', routes);
// app.use('/users', users);

function Users() {
  return knex('users')
}


//-------------------------------Authorization ----------------------------------------


//Sign Up

app.get('/signup', (req, res) => {
  res.render('signup');
})

app.post('/signup', (req, res) => {
  var salt = bcrypt.genSaltSync(10)
  var hash = bcrypt.hashSync(req.body.password, salt)
  Users().insert({
    userFirstName: req.body.firstname,
    userLastName: req.body.lastname,
    userEmail: req.body.email,
    userPassword: hash
  }).then(() => {
    res.redirect('/signin')
  })

})

// Sign In

app.get('/signin', (req, res) => {
  res.render('signin');
})

app.post('/signin', (req, res) => {
  Users().where({userEmail: req.body.email}).first().then((user) => {
    if (user) {
      var hash = bcrypt.hashSync(req.body.password, 10)
      bcrypt.compare(hash, user.password, (res, err) => {
        req.session.users = user;
        // eval(locus)
        // res.redirect('/');
      })
  }
      else {
        res.render('signin', {error: 'No Email/Password matches'})
      }
        res.redirect('/')
    })
  })









// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
