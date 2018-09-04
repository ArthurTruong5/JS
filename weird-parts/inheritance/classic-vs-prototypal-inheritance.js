// Inheritance
// One object gets access to the other properties and methods of another object.

// Classical Inheritance
// 1. Verbose

// Prototypal Inheritance
// 1. Simple
// - Flexible, extensible, easy to understand

// Understanding the Prototypal Inheritance

var person = {
  firstname: 'Default',
  lastname: 'Default',
  getFullName: function() {
    return this.firstname + ' ' + this.lastname;
  }
}

var john = {
  firstname: 'John',
  lastname: 'Doe'
}

// Don't do this ever!, demo purposes only !!!

john.__proto__ = person;

for (var prop in john) {
  if (john.hasOwnProperty(prop))
  console.log(prop + ': ' + john[prop]);
}

var jane = {
  address: = '111 Main St.'
  getFormalFullName: function () {
    return this.lastname + ', ' + this.firstname;
  }
}

var jim = {
  getFirstName: function() {
    return firstname;
  }
}

_.extend('')

//
// console.log(john.getFullName());
//
// var jane = {
//   firstname: 'Jane'
// }
//
// jane.__proto__ = person;
// console.log(jane.getFullName());
