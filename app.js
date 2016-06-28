var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var passport = require('passport');//chris


var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();

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
  var hash = bcrypt.hashSync(req.body.password, 8)
  Users().insert({
    email: req.params.email,
    password: hash
  }).then(() => {
    res.redirect('/signin')
  })
})

//Sign In

app.get('/signin', (req, res) => {
  res.render('signin');
})

app.post('/signin', (req, res) => {
  Users().findOne({email: req.params.email}).then((user) => {
    if (user) {
      var hash = bcrypt.hashSync(req.body.password, 8)
      if (bcrypt.compareSync(hash, user.password)) {
        req.session.user = user;
        res.redirect('/');
      } else {
        res.render('signin', {error: 'No Email/Password matches'})
      }
        res.redirect('signin')
    }
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
