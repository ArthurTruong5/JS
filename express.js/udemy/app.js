// Node.js follows the CommandJs module system and have a built in require function
var express = require('express');

// Invokes express - express starts
var app = express();

// Server starts and listens to port 3000
var port = process.env.PORT || 3000;

// GET /static/style.css etc.
app.use('/assets', express.static(__dirname + '/public'));

// Application Routing, intended for matching and handling a specific route when requested with the GET HTTP verb:
app.get('/', function(req, res) {
	res.send('<html><head></head><body><h1>Hello world!</h1></body></html>');
});

// Mounts the specified middleware function or functions at the specified path: the middleware function is executed when the base of the requested path matches path.
app.use('/', function (req, res, next) {
	console.log('Request Url:' + req.url);
	next();
});

// Renders the EJS HTML template in the view file
app.get('/', function(req, res) {
	res.render('index');
});

// Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.
// Renders the EJS HTML template in the view file
app.get('/person/:id', function(req, res) {
	res.render('person', { ID: req.params.id });
});
// Same thing as aboce
app.get('/person/:id', function(req, res) {
	res.send('<html><head></head><body><h1>Person: ' + req.params.id + '</h1></body></html>');
});

// Sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using JSON.stringify().
app.get('/api', function(req, res) {
	res.json({ firstname: 'John', lastname: 'Doe' });
});

// Starts a UNIX socket and listens for connections on the given path.
app.listen(port);
