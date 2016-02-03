var express = require('express');
var sendgrid = require("sendgrid")(process.env.SENDGRID_API);

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

	var email = new sendgrid.Email();
	var msg = "<p>There has been a submission from the Osden website:</p>" +
				  "<p>Name: " + req.body.name + "</p>" +
				  "<p>Email: " + req.body.email + "</p>" +
				  "<p>Phone: " + req.body.phone + "</p>" +
				  "<p>Message: " + req.body.text + "</p>" +
				  "<p>Subscribe: " + (req.body.newsletter ? "Yes" : "No") + "</p>"

	email.addTo(process.env.CONTACT_EMAIL);
	email.setFrom(process.env.WEBSITE_EMAIL);
	email.setSubject("Osden Website Form Submission");
	email.setHtml(msg);

	sendgrid.send(email,
		function (err, message) { 
		   	if(err) {
		   		console.log(err);
		   		console.log("Message: " + message);
		   		res.status(500).send(err);	
		   	} else {
		   		res.send(message);
		   	}
		}
	);
});

module.exports = router;
