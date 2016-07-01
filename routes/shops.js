var express = require('express');
var router = express.Router({mergeParams:true});
var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var bodyParser = require("body-parser");
var multer = require('multer');

//READ ALL FOR SINGLE USER
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
  .then(function(shops){
        console.log(user,shops);
        res.render('shops/index', {user:user,shops:shops});
    });
  });
});

// CREATE
//shopName	shopAbout	shopCell	shopEmail	shopPaypalMerchId	shopImgUrl	shopPrivacy	shopReturn
router.get('/new', function(req, res){
  var shopId = req.params.shopUser_id;
  console.log('SHOW SHOP ID: *******************');
  console.log(shopId);
  res.render('shops/new', {shopId:shopId,layout:'shops/layout4.hbs'});
});
router.post('/', multer({ dest: './ups/'}).single('shopImgUrl'), function(req, res) {
  var shopUser_id = req.params.shopUser_id;
  var imgpath = req.file.path;
  var shopImgUrl = imgpath.split('/')[1];
  var shopName = req.body.shop.shopName;
  var shopAbout = req.body.shop.shopAbout;
  var shopPaypalMerchId = req.body.shop.shopPaypalMerchId;
  var shopImgUrl = req.body.shop.shopImgUrl;
  console.log('VARS: *******************');
  console.log(shopUser_id,imgpath,shopImgUrl,shopName,shopAbout,shopPaypalMerchId,shopImgUrl);
  knex('shops').insert({
    shopUser_id: shopUser_id,
    shopName:shopName,
    shopAbout:shopAbout,
    shopPaypalMerchId:shopPaypalMerchId,
    shopImgUrl:shopImgUrl
  }).then(function(shop){
      console.log('SHOW SHOP OBJECT: ********************');
      console.log(shop);
      res.redirect('/users/' + shopUser_id + '/shops');
  });
});
// shopId	shopName	shopAbout		shopPaypalMerchId	shopImgUrl				shopUser_id


// READ ONE
router.get('/:shopId', function(req, res) {
  knex('shops').where({shopId: req.params.shopId}).first().then(function(shop){
    res.render('shops/show', {shop:shop});
  });
});




module.exports = router;
