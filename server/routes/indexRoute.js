// Express Routing  -- as CommonJS module

var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // send a static file as the response
  res.sendFile(path.join(__dirname, '../../client/src/templates', 'index.html'));
  
});

module.exports = router;
