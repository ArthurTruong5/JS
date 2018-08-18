b();
console.log(a);

var a = 'Hello World';

function b() {
  console.log('Called B');
}

// Since JavaScript is synchronous. The JS will read b and output it but will declare a as undefined since it reads one code at a time

// Creation process
// During the creation phase, the execution context creates three things; the global object, this and outer environment.

// Hoisting
// Is the setup memory space for variable and functions. Before code is to be executed line by line, the JaveScript engine has setup memory space for variables and all the functions thats already been created and exist in memory. When the code is run line by line, it can execute them. However when it comes to variables, it's different. The JavaScript engine doesn't know what the value is yet and will place it as undefined. All variables are initially set to undefined and functions are sitting memory of the entirety. 
