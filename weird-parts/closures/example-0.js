var passed = 3

var addTo = function() {
  var inner = 2;
  return passed + inner;
}

console.dir(addTo);

// Lexical scoping - if var isn't available inside, it will find it outside.
