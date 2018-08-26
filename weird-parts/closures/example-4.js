function buildFunctions() {
  var arr = [];

// Once it reaches 3, it leaves the for loop
  for (var i = 0; i < 3; i++) {
    arr.push(
      // contains 3 functions
      function() {
        console.log(i);
      }
    )
  }
  // push is still in memory
    return arr;
}

var fs = buildFunctions();

fs[0]();
fs[1]();
fs[2]();

// Global execution context. It contains the buildfunction(),fs
// Execution context within build functions. i = 3 and arr of f0,f1,f2.



function buildFunctions2() {
  var arr = [];

// Once it reaches 3, it leaves the for loop
  for (var i = 0; i < 3; i++) {
    let j = i
    arr.push(
      (function(j){
        return function() {
          console.log(j);
        }
      }(i))
    )
  }
  // push is still in memory
    return arr;
}

var fs2 = buildFunctions2();

fs2[0]();
fs2[1]();
fs2[2]();

// Global execution context. It contains the buildfunction(),fs
// Execution context within build functions. i = 3 and arr of f0,f1,f2.
