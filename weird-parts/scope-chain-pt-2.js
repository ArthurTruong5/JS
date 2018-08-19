// Sample code


// What happens if its a function within a function

// Where something sits lexically, you can easily find whats the reference in the scope chain

// The reference for function a() for its outer lexical environment would be the global execution context
function a() {

// The reference for function b() for its outer lexical environment would be function a()

  function b() {
    console.log(myVar);
  }

  var myVar = 2;
  b();
}

// Global execution context = 1
var myVar = 1;
a();

// myVar isn't declared in function b()
