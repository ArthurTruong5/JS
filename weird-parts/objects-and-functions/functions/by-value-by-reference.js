// Primitive Value - by value
// All primitive types are by value
var a = 3;
var b;

// Below JS will make a copy of b into memory which is = to 3
b = a;
a = 2;
// If we change a, it won't affect b
console.log(a);
console.log(b);

// All objects are by reference
// by reference (all objects (including functions))
// WHen it comes to objects, it links to the memory eg reference
var c = { greeting: 'hi' }
var d;

d = c
// Mutate: to change something
// Immutable means it can't be changed
c.greeting = 'hello';
console.log(c);
console.log(d);

var sayHello = function hello() {
  console.log("Hey");
}

var sayGoodbye = function bye() {
  console.log("Bye");
}

// equals operator sets up new memory space (new address)
sayGoodbye = sayHello
