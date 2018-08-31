// Make a program that filters a list of strings and returns a list with only your friends name in it.
//
// If a name has exactly 4 letters in it, you can be sure that it has to be a friend of yours! Otherwise, you can be sure he's not...
//
// Ex: Input = ["Ryan", "Kieran", "Jason", "Yous"], Output = ["Ryan", "Yous"]
//
// Note: keep the original order of the names in the output.

function friend(friends){
  console.log(friends.filter(word => word.length == 4));
}
//
// function friend(friends) {
//   console.log(friends.filter(function (word) {
//     return word.length == 4;
//   }));
// }

friend(["Ryan", "Jimmy", "123", "4", "Cool Man"]);
