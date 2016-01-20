var express = require('express');
var emailjs = require('emailjs');

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

router.post('/contact/submit', function(req, res) {

	var msg = "There has been a submission from the Osden website:\n" +
			  "Name: " + req.body.name + "\n" +
			  "Email: " + req.body.email + "\n" +
			  "Phone: " + req.body.phone + "\n" +
			  "Message:" + req.body.text + "\n" +
			  "Subscribe: " + req.body.join

	var server = emailjs.server.connect({ 
											user: process.env.EMAIL_USER,
											password: process.env.EMAIL_PASSWORD,
											host: process.env.EMAIL_HOST,
											ssl: process.env.EMAIL_SSL == true || 
										  		 process.env.EMAIL_SSL == "true",
											smtp: true
      									});

	server.send({
					text: msg,
					from: 'info@osden.io',
					to: 'info@osden.io',
					subject: 'Osden contact' 
				},
			    
			    function (err, message) { 
			    	if(err) {
			    		console.log(err);
			    		console.log("Message: " + message);
			    		res.send('error');	
			    	} else {
			    		res.send('sent');
			    	}
			    });
});

module.exports = router;
