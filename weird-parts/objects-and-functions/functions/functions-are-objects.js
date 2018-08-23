// Functions are Objects

// First class Functions
// Everything you can do with other types you can do with function e.g numbers, booleans, other functions
// Assign them to variables, pass them around, create them on the fly

// Functions
// 1. Primitive
// 2. Object
// 3. Function
// 4. Name
// 5. Code - invocable

// Add property to a function
function greet() {
  console.log('hi');
}

greet.language = 'english';
console.log(greet)
// Outputs
// ƒ greet() {
//   console.log('hi');
// }
