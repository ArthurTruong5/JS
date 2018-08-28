function sayHiLater() {
  // closure, it see's this memory space.
  var greeting = 'Hi';
  // aSync
  setTimeout(function(){
    console.log(greeting);
  },3000);
}

sayHiLater();

// Jquery uses function expressions and first-class functions!
// $("button").click(function(){
// })

// Big word alert

// Callback function: A function you give to another function to be run when other function is finished. So the function you (i.e invoke) calls back by calling the function gave it when it finishes.

function tellMeWhenDone(callback) {
  var a = 1000; // some work
  var b = 2000; // some work

  callback(); // the 'callback', it runs the function i give it
}

tellMeWhenDone(function(){
  console.log('I am done');
});
