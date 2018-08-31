function tickets(peopleInLine){

var sum = peopleInLine.reduce(function(a, b) { return a + b });

  if (sum === sum) {
    console.log("YES");
  } else {
    console.log("NO");
    console.log(sum);
  }
}

tickets([25, 25, 50, 50, 100]);
