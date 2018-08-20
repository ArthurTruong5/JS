// Comparison operators

console.log(1 < 2 < 3);

console.log(3 < 2 < 1);
// ^^^^^^^
console.log(false < 1);
// if you type Number(false) in google chrome console its a 0

var a = 0
var b = false;

if (a === b ) {
  console.log('They are equal');
  else {
    console.log('Nope, not equal')
  }
}
