var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var passport = require('passport');
// require('dotenv').config();
// console.log("NODE_ENV:" + NODE_ENV);
var knex = require('./db/knex');

var cookieSession = require('cookie-session');

var methodOverride = require("method-override");
var stormpath = require('express-stormpath');


var app = express();

require('locus');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))
app.use(express.static(path.join(__dirname, 'ups')));
// app.use(express.static(__dirname + "/ups"));
app.use(methodOverride('_method'));
app.use(stormpath.init(app, {
  website: true,
  href: 'https://api.stormpath.com/v1/applications/3k1rwmEVn32FMiaiXSTpZI'
}));

app.on('stormpath.ready', function () {
  console.log('Auth Ready');
});

//-------------------------------Begin Price Routes----------------------------------------
var routes = require('./routes/index');
// var users = require('./routes/users');

app.use('/', routes);
// app.use('/users', users);
//-------------------------------End Price Routes----------------------------------------

//-------------------------------Begin Chris Routes----------------------------------------
var usersRoute = require('./routes/users');
app.use('/users',usersRoute);

var catsRoute = require('./routes/cats');
app.use('/cats',catsRoute);

// var registerRoute = require('./routes/register');
// app.use('/register',registerRoute);

var homeRoute = require('./routes/home');
app.use('/home',homeRoute);

var shopsRoute = require('./routes/shops');
app.use('/users/:shopUser_id/shops',shopsRoute);

var prodsRoute = require('./routes/prods');
app.use('/users/:shopUser_id/shops/:prodShop_id/prods',prodsRoute);
//-------------------------------End Chris Routes----------------------------------------

function Users() {
  return knex('users')
}

// app.post('/logout', function(req,res){
//   res.cookie('access_token', '', { expires: new Date(1), path: '/' })
//   res.cookie('oauthRedirectUri', '', { expires: new Date(1), path: '/' })
//   res.cookie('oauthStateToken', '', { expires: new Date(1), path: '/' })
//   res.cookie('refresh_token', '', { expires: new Date(1), path: '/' })
//   .then(function(result, err){
//   res.redirect('/');
// });
// });
//-------------------------------Authorization----------------------------------------


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

// app.get('/signup', (req, res) => {
//   res.render('signup');
// })
//
// app.post('/signup', (req, res) => {
//   var salt = bcrypt.genSaltSync(10)
//   var hash = bcrypt.hashSync(req.body.password, salt)
//   Users().insert({
//     userFirstName: req.body.firstname,
//     userLastName: req.body.lastname,
//     userEmail: req.body.email,
//     userPassword: hash
//   }).then(() => {
//     res.redirect('/signin')
//   })
//
// })
//
// //Sign In
//
// app.get('/signin', (req, res) => {
//   res.render('signin');
// })
//
// app.post('/signin', (req, res) => {
//   Users().findOne({email: req.params.userEmail}).then((user) => {
//     if (user) {
//       var hash = bcrypt.hashSync(req.body.userPassword, 10)
//       if (bcrypt.compareSync(hash, user.userPassword)) {
//         req.session.user = user;
//         res.redirect('/');
//       } else {
//         res.render('signin', {error: 'No Email/Password matches'})
//       }
//         res.redirect('signin')
//     }
//   })
// })










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

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('listening on'+ port);
})

//before class pres comment this back out
module.exports = app;
