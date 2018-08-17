// Call Stack

// Single threaded one time and a single call stack, one piece of code at a time

// Single thread == Single Call Back = One piece of code at a time

// Stack
// - Main ()

function multiply(a, b) {

  return a * b;

}


function square(n) {

  return multiply(n, n);

}

function printSquare(n) {

  var squared = square(n);
  console.log(squared);

}

printSquare(4);

// Output 16

// 1. function Printsquare is called
// 2. JS see's console.log(square)
// 3, Goes to square function
// 4. Executes and JS sees return multiply
// 5. JS goes to multiply function
// 6. Multiply function says 4 * 4
// 7.
