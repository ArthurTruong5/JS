// Simply put: A callback is a function that is to be executed after another function has finished executing — hence the name ‘call back’.

let add = function(a,b){
  return a+b;
};

let multiply = function(a,b){
  return a*b;
};

let doWhatever = function (a,b){
  console.log(`Here are your two numbers back ${a}, ${b}`);
}

let calc = function(num1, num2, callback){

  if (typeof callback === "function"){
      return callback(num1,num2);
  }
  // if (calcType == "add"){
  //   return num1 + num2;
  // } else if (calcType == "multiply"){
  //   return num1 * num2;
  // }
};

console.log(calc(2,3,function(a,b){
  return a-b;
}));
