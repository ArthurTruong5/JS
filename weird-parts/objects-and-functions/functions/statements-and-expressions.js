// Big word alert
// Expression : A unit of code that results in a jsonValue
// It doesn't have to save a variable

// Function statement - saves in the memory
function greet() {
  console.log('hi');
}

// Setting a variable to an object
// Below is a function expression
// Below is anon function
// Function expressions aren't hoisted
var anonGreet = function() {
   console.log('hi');
}

var firstname = "Christine"
console.log(firstname)

anonGreet();

// Function statements - create on the fly, if you don't want to create on the fly
function log(a){
  console.log(a);
}

log({greetings: "hi" });
// First class functions
log(function(){
  console.log('Hi');
})
