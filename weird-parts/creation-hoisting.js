b();
console.log(a);

var a = 'Hello World';

function b() {
  console.log('Called B');
}

// Since JavaScript is synchronous. The JS will read b and output it but will declare a as undefined since it reads one code at a time

// Creation process
// During the creation phase, the execution context creates two things; the global object, this and outer environment.

// Hoisting
// Is the setup memory space for variable and functions
