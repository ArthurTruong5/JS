var request = require('request');
request('http://ip-api.com/csv', function (error, response, body) {
  console.log('Hi, here is your data:'); // Print the error if one occurred
  console.log(body.split(",").slice(1)); // Print the HTML for the Google homepage.
});
