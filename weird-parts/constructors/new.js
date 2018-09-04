function Person(firstname, lastname) {
  console.log(this);
  this.firstname = firstname;
  this.lastname = lastname;
  console.log('This function is being invoked');
}

// new will create an empty object and invokes it
var john = new Person();
console.log(john);

// What is i want to create more people

var viet = new Person('Viet', 'Truong');
console.log(viet);
