var addTo = function(passed) {
  var add = function(inner){
    return passed + inner;
  };
    return add;
}


console.log(addTo(3));

// To understand what closures are, we must first understand what a lexical scope is. Lexical scoping is pretty much where a variable is in the inner environment.
