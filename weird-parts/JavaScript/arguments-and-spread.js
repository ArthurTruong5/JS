// Big word alert
// Arguments: The parameters you pass to a function. Javascript gives you a keyword of the same name which contains them all.

function greet(firstname, lastname, language) {
  console.log(firstname);
  console.log(lastname);
  console.log(language);
  console.log('--------');
}

greet();
greet('John');

// ES6
const checkAdult = (...args) => {
  return args.filter (el => el > 18)
}

 var checkAdult1 = function(...args) {
    return args.filter(function(el) {
     el > 18
  });
 }

// ES5
 var checkAdult = function(num1,num2,num3) {
   var args = [num1,num2,num3]
   var result = args.filter(checkValue);
   return result
 }

 function checkValue(el){
   return el > 18
 }

 checkAdult(10,5,20);

console.log(checkAdult(10,5,20,30,40,0,10));
console.log(checkAdult1(10,5,20,30,40,0,10));
