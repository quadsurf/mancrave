var express = require('express');
var router = express.Router({mergeParams:true});
var knex = require('../db/knex');
var bodyParser = require("body-parser");

router.get('/', function(req,res){
  res.render('index',{layout:'layout.hbs'})
});




module.exports = router;
