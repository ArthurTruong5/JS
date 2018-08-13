var request = require('request');
request('http://jservice.io/api/random', function (error, response, body) {
  console.log('Information'); // Print the error if one occurred
  // console.log(body.split(",").slice(1)); // Print the HTML for the Google homepage.

  geoArray = (body.split(","));
  console.log(geoArray);
  console.log(geoArray[2].toUpperCase());

});
