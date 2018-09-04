// Node.js follows the CommandJs module system and have a built in require function
var express = require('express');

// Invokes express - express starts
var app = express();

// Server starts and listens to port 3000
var port = process.env.PORT || 3000;

// Application Routing, intended for matching and handling a specific route when requested with the GET HTTP verb:
app.get('/', function(req, res) {
	res.send('<html><head></head><body><h1>Hello world!</h1></body></html>');
});

// Sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using JSON.stringify().
app.get('/api', function(req, res) {
	res.json({ firstname: 'John', lastname: 'Doe' });
});

// Starts a UNIX socket and listens for connections on the given path.
app.listen(port);
