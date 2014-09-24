var nodemailer = require('nodemailer');
var emailTemplates = require('email-templates');
var path = require('path');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'vlad.c.manea@gmail.com',
        pass: 'Carapicuiba600'
    }
});

module.exports = {
	getIndex: function(req, res) {
		res.render('index.jade');
	},
	
	postContact: function(req, res) {
		var templatesDir = path.resolve(__dirname, '..', 'templates');
		emailTemplates(templatesDir, function(err, template) {
			if (err) {
				console.log(err);
				req.flash('errorMessage', 'Could not load the template.');
				res.redirect('/#contact');
				return;
			}
		
			var locals = {
				message: req.body.message,
				email: req.body.email,
				name: req.body.name,
				phone: req.body.phone
			};
			
			template('contact', locals, function(err, html, text) {
				if (err) {
					console.log(err);
					req.flash('errorMessage', 'Could not create the template.');
					res.redirect('/');
					return;
				}
				
				// Strip off funny tags from html
				text = text.split('<innosund>').join('').split('</innosund>').join('');
				
				var mailOptions = {
					from: req.body.email, // sender address
					to: ['kontakt@innosund.dk', 'vlad.c.manea@gmail.com'], // list of receivers
					subject: 'Message through innosund.dk website from ' + req.body.name,
					text: text,
					html: html
				};
				
				transporter.sendMail(mailOptions, function(err, info){
					if (err){
						console.log(err);
						req.flash('errorMessage', 'Could not send the message.');
						res.redirect('/#contact');
						return;
					}
					
					req.flash('successMessage', 'The message has been sent.');
					res.redirect('/');
				});
			});
		});
	},
};