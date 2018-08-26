var addTo = function(passed) {
  var add = function(inner){
    return passed + inner;
  };
    return add;
}


console.log(addTo(3));

// To understand what closures are, we must first understand what a lexical scope is. Lexical scoping is pretty much where a variable is in the inner environment.

function makeFunc() {
  var name = 'Mozilla';
  function displayName() {
    console.log(name);
  }
  return displayName;
}

var myFunc = makeFunc();
myFunc();
