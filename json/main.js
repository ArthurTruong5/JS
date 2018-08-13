var request = require('request');
request('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22australia%2C%20sydney%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function weather(error, response, body) {
  console.log('Hi, here is your data:'); // Print the error if one occurred
  // console.log(body.split(",").slice(1)); // Print the HTML for the Google homepage.

  var weatherApi = (body.split(",").slice(1));

  var sunSet = (body.split(",")[49].slice(8));

  console.log(weatherApi);

  document.getElementById('demo').innerHTML = (weatherApi);
  document.getElementById('sun').innerHTML = (sunSet);

});
