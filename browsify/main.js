main.js
"use strict";

var R = require('ramda');

var square = function square (x) { return x * x; }
var squares = R.chain(square, [1, 2, 3, 4, 5]);

document.getElementById('response').innerHTML = squares;
