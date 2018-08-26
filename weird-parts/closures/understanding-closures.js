// Understanding Closures

function greet(whattosay) {

// return will STOP the execution and the greet stack will POP off the stack. But every execution context has space and memory live. So what happens when the execution context goes away? Under normal circumstances it clears it out called garbage collection.
  return function(name) {
    console.log(whattosay + ' ' + name);
  }

}

var sayHi = greet('Hi');
sayHi('Tony');

// 1. Global Execution Context starts
// 2. var sayHi = greet('Hi'); -> invokes the greet() function
// 3. New execution context is created. sayHi is then saved within its variable environment which is hi.
// 4. It then returns a new FUNCTION object
// 5.
