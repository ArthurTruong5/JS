const express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send('Hello Express')
});

app.listen(process.env.PORT || 3000)

// Line 1: You can think of require as a need to import something. You can instantiate it at the top of your file.
// Line 2: We are creating the express app by setting it to the app variable.
// Line 3: .get is saying that when it gets that route it should give the response that is specified in the function. It takes in 2 arguments: (1) the url (2) the function that tells express what to send back to the person making the request.
// Line 5: .listen is going to bind the application to the port on our machine.
