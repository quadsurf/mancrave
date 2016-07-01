var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

var Knex = function() {
	return knex('users');
}

router.get('/', function(req, res, next) {
		// var person = JSON.parse(req.query.person);
		Knex()
			.insert({
				userEmail: req.session.person.email,
				userFirstName: req.session.person.givenName,
				userLastName: req.session.person.surname
				})
			.then(function(result,err){
				res.redirect('/userr');
			  });
	})

module.exports = router;
