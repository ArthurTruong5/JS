function promiseThatResolvesTwo() {
  return new Promise( (resolve,reject) => {
    setTimeout( () => {
      resolve("Waited two seconds . . .");
    }, 2000);
  });
}

let promise = promiseThatResolvesTwo();

promise.then((value) => console.log(value));

console.log("here");
