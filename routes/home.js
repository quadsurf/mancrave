var express = require('express');
var router = express.Router({mergeParams:true});
var knex = require('../db/knex');
var bodyParser = require("body-parser");

router.get('/', function(res,req){
  res.render('home/index',{layout:'layout.hbs'})
});




module.exports = router;
