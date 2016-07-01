var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


router.get('/', function(req, res, next) {
	knex.select('userId')
		.from('users')
		.where({userEmail:req.session.person.email})
		.first()
	.then(function(result,err){
		var person = result;
		var userId = person.userId;
		res.redirect('/users/'+userId);
		});
	})

module.exports = router;
