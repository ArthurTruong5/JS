// Faking namespace

// Namespace: A container for variables and functions
// Typically to keep varibales and functions with the same name seperate

var greet = 'Hello';
var greet = 'Hola';

console.log(greet);

var english = {
  greetings: {
    basic: 'Hello!'
  }
};
var spanish = {};
english.greet = 'Hello!';
spanish.greet = 'Hola!';

console.log(english)
