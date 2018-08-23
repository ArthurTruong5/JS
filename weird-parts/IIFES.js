// Immediately Invoked Functions Expressions (IIFEs)

// function statement
function greet(name) {
  console.log('Hello ' + name);
}

greet('John');

// function expressions
var greetFunc = function(name) {
  console.log('Hello ' + name);
};

greetFunc('John');

// Using an Immediately Invoked Function Expression (IIFE)
var greeting = function(name) {
  console.log('Hello ' + name);
}('John');

var greetingTest = function(name) {
  return 'Hello ' + name;
};
console.log(greetingTest('John'));

// Function expressions. We just want to wrap it and do nothing with it.
// Below is a immediately invoked function expression
var firstname = 'John';

(function(name){
  var greeting = 'Inside IIFE: Hello';
  console.log(greeting + ' ' + name);
}(firstname)); // IIFE
