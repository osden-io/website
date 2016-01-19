var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/development', function(req, res) {
  res.render('development');
});

router.get('/about', function(req, res) {
  res.render('about');
});

router.get('/contact', function(req, res) {
  res.render('contact');
});

module.exports = router;
