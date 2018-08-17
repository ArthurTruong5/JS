// Simply put: A callback is a function that is to be executed after another function has finished executing — hence the name ‘call back’.


let x = function(){
  console.log("I am called inside a function")
};

let y = function(callback){
  console.log("Do something");
  callback();
}

y(x);
