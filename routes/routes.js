var dashboard = require('../controllers/dashboard');

module.exports = function(app) {
	
	// Show home page
	app.get('/', dashboard.getIndex);
	
	// Process contact
	app.post('/contact', dashboard.postContact);
};