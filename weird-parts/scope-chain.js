// Sample code

function b() {
  // Execution context = Outer environment != can find myVar so link to = Global Exeuction Context
  // Here the execution context is trying to find the variable myVar, whats unique about JavaScript is that if it can't find the variable within that exeuction context, it will find the variable in the outer environment. In this case, the outer environment is in the global execution context which is myVar = 1. This whole thing is called the scope chain; where can i find the variable. The chain is the links to outer environment. Lexical is that where it was physically written.
  console.log(myVar);
}

function a() {
  // Execution Context = 2 = Outer environment = Global excution context
  var myVar = 2;
  b();
}

// Global execution context = 1
var myVar = 1;
a();

// myVar isn't declared in function b()
