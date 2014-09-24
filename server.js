var connect = require('connect');
var http = require('http');

var app = connect()
	.use(connect.favicon('public/favicon.ico'))
	.use(connect.static('public'))
	.use(connect.directory('public'));

http.createServer(app).listen(process.env.PORT || 5000);