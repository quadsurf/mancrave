var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bodyParser = require("body-parser");


var Knex = function() {
  return knex('users');
}

router.get('/', function(req, res, next) {
  res.render('home/index', { layout:'home/layout.hbs' });
});

module.exports = router;
