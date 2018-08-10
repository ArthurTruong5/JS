// input, value => returns a number
function addition() {
  var ourAnswer = document.getElementById("answer").value

  // True
  if (isNaN(ourAnswer)) {

    document.getElementById("output").innerHTML = ourAnswer + " is not a number!";

  } else {

    if (ourAnswer == numAnswer) {
      document.getElementById("output").innerHTML = "Correct! " + numOne + " + " + numTwo + " = " + numAnswer;
    } else {
      document.getElementById("output").innerHTML = "Incorrect! " + numOne + " + " + numTwo + " does not equal to " + ourAnswer;
    }

  }

}

function resetCard() {
document.getElementById("output").innerHTML = "";

document.getElementById("answer").value = ""

// already initialized

numOne = (Math.floor(Math.random() * 10) + 1);

numTwo = (Math.floor(Math.random() * 10) + 1);

numAnswer = (numOne + numTwo);

document.getElementById("demo").innerHTML = (numOne + " + " + numTwo);




}
