function makeFunc() {
  var name = 'Mozilla';

  // Below isn't invoked
  function displayName() {
    console.log(name);
  }
  // This is invoked
  return displayName;
}

// Function is defined
var myFunc = makeFunc();
myFunc();

// JavaScript - How it works
// 1. First JS will see the function expression of myFunc
// 2. var myFunc is defined
// 3. myFunc(); is invoked
// 4. Creates new execution stack
// 5. var name = "Mozilla" will be stored within the execution stack 1
// 6. JS will see return and it will POP OFF the execution stack. The function will send the return value back to the calling context. The calling context is the execution context that called the function.
// 7. displayName is invoked
// 8. console.log(name) is return, name will then need to be defined. JS will perfirm lexical scoping. Name is not find within the execution stack and will then search within the parent stack. Name is found in the outer environment of makeFunc.
