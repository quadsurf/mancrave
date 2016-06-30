var express = require('express');
var router = express.Router({mergeParams:true});
var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var bodyParser = require("body-parser");
var multer = require('multer');

//READ ALL
//shops COLUMNS
//shopId	shopName	shopAbout	shopCell	shopEmail	shopPaypalMerchId	shopImgUrl	shopPrivacy	shopReturn	shopSince	shopStripe_id	shopBitCoin_id	shopUser_id
router.get('/', function(req, res){
  knex
    .select('*')
    .from('users')
    .where({userId:req.params.shopUser_id})
    .first()
  .then(function(user){
      knex
        .select('*')
        .from('shops')
        .where({shopUser_id:user.userId})
        .innerJoin('stripes', function() {
          this
            .on('shops.shopStripe_id', 'stripes.stripeId');
        })
  .then(function(shops){
        console.log(user,shops);
        res.render('books/index', {user:user,shops:shops});
    });
  });
});

// CREATE
router.get('/new', function(req, res){
  var shopId = req.params.shopUser_id;
  res.render('shops/new', {id:id});
});
router.post('/', function(req, res) {
  var author_id = req.params.author_id;
  var title = req.body.book.title;
  var genre = req.body.book.genre;
  knex('books').insert({
    title: title,
    genre:genre,
    author_id: author_id
  }).then(function(book){
      res.redirect('/authors/' + author_id + '/books');
  });
});

// READ ONE
router.get('/:id', function(req, res) {
  knex('books').where({id: req.params.id}).first().then(function(book){
    res.render('books/show', {book: book});
  });
});




module.exports = router;
