// Set up ====================================================================

// Get all the tools we need...
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var path = require('path');
var stylus = require('stylus');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// Set up express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(stylus.middleware({
	src: __dirname + "/public",
	compress: true
}));

app.use(express.static(path.join(__dirname, 'public')));

// Set up jade for templates
app.set('view engine', 'jade');

app.use(session({ secret: 'sasesasiinsasesaci' })); // session secret
app.use(flash()); // for flash messages stored in session

app.use(function(req, res, next){
	res.locals.successMessage = req.flash('successMessage');
	res.locals.errorMessage = req.flash('errorMessage');
	next();
});

// Routes ====================================================================

require('./routes/routes.js')(app); // load our routes

// Launch ====================================================================

app.listen(port);
console.log('The magic happens on port ' + port);