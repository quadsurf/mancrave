var express = require('express');

router.get('/', function(res,req){
  res.render('home/register',{layout:'layout.hbs'})
});




module.exports = router;
