var express = require('express');
var router = express.Router({mergeParams:true});
var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var bodyParser = require("body-parser");
var multer = require('multer');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var Knex = function() {
  return knex('users');
}

//READ ALL
router.get('/',function(req,res){
  Knex().then(function(result,err){
    res.render('users/index',{users:result,layout:'users/layout.hbs'});
  })
});

//TEST LOGOUT FORM
router.get('/logouttest',function(req,res){
    res.render('users/formlogout',{layout:'users/layout3.hbs'});
  });
router.post('/logout',function(req,res){
    res.redirect('/');
  });

//CREATE
//Price will Merge This
//Users Table Columns
//userId	userEmail	userPassword	userFirstName	userLastName	userCell	userImgUrl	userLogo	userAbout	user_isSeller	user_isAdmin	userSince
// router.get('/new',function(req,res){
//   res.render('users/new',{layout:'users/layout3.hbs'});
// });
// router.post('/',function(req,res){
//   var user = req.body;
//   Knex()
//     .insert({
//       userEmail: user.userEmail,
//       userPassword: user.userPassword,
//       userFirstName: user.userFirstName,
//       userLastName: user.userLastName
//       })
//     .then(function(result,err){
//       res.redirect('/users')
//       });
// });


// READ ONE
router.get('/:userId',function(req,res){
  var userId = req.params.userId;
  Knex()
    .where('userId',userId)
    .first()
    .then(function(result,err){
      var user = result;
      console.log(user);
      res.render('users/show',{user:user,layout:'users/layout2.hbs'});
      });
});


// UPDATE GET
router.get('/:userId/edit',function(req,res){
  var userId = req.params.userId;
  Knex()
  .where('userId',userId)
  .first()
  .then((result,err) => {
    var user = result;
    res.render('users/edit', {user:user,layout:'users/layout3.hbs'});
  })

});

// UPDATE PUT
//Users Table Columns
//userId	userEmail	userPassword	userFirstName	userLastName	userCell	userImgUrl	userLogo	userAbout	user_isSeller	user_isAdmin	userSince
// [multer({ dest: './ups/'}).single('imgfile'),jsonParser]
router.put('/:userId', multer({ dest: './ups/'}).single('userImgUrl'), (req,res) => {
  var user = req.body,
      userId = req.params.userId;
      // imgfile = req.file.filename;
  var imgpath = req.file.path;
  var userImgUrl = imgpath.split('/')[1];
  console.log(userImgUrl);
  Knex()
    .where({userId:userId})
    .update({
      userEmail: user.userEmail,
      userPassword: user.userPassword,
      userFirstName: user.userFirstName,
      userLastName: user.userLastName,
      userCell: user.userCell,
      userImgUrl: userImgUrl,
      userAbout: user.userAbout
    }, 'userId')
    .then((result,err) => {
      res.redirect('/users/'+userId);
      });
});

// DELETE
router.delete('/:userId', (req,res) => {
  var userId = req.params.userId;
  Knex()
    .where('userId', userId)
    .first()
    .del()
    .then((result,err) => {
      // res.send(200).end();
      res.redirect('/users');
      });
})




module.exports = router;
