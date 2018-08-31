// Implement a function that adds two numbers together and returns their sum in binary. The conversion can be done before, or after the addition.
//
// The binary number return
function addBinary(a,b) {
  const sum = (a + b).toString(2);
  return(sum);
  console.log(sum);
}

addBinary(51,12);
