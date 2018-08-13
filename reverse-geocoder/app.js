var request = require('request');
request('http://ip-api.com/csv', function (error, response, body) {
  console.log('Hi, here is your data:'); // Print the error if one occurred
  // console.log(body.split(",").slice(1)); // Print the HTML for the Google homepage.

  var geoArray = (body.split(",").slice(1));
  console.log("Country/City: " + geoArray[(8)]);
  console.log("State: " + geoArray[(3)]);
  console.log("Suburb: " + geoArray[(4)]);
  console.log("Post Code: " + geoArray[(5)]);
  console.log("Latitude: " + geoArray[(6)]);
  console.log("Longitude: " + geoArray[(7)]);
  console.log("IP Address: " + geoArray[(12)]);

});
