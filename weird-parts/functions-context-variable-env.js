function b() {
  var myVar;
  console.log(myVar);
}

function a() {
  var myVar = 2;
  console.log(myVar);
  b();
}

var myVar = 1;
console.log(myVar);
a();

// Global execution context is created. var myVar = 1 will be saved into memory. Since JavScript is synchronous, it will then invoke a();. Another global execution context is created and myVar = 2; will be saved into memory WITHIN that execution context. Therefore, console.log would be 2. b(); is invoked and creates another global execution context and the output would be undefined.
