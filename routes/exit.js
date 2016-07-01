var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var request = require('request');

router.get('/', function(req, res, next) {
	req.session.person = null;

	request.post('/logout').then(function(result,err){
		res.redirect('/home');
	});

	// request.post('/logout');
	// res.redirect('/home');

});

module.exports = router;
