// Objects and the dot

// Objects
// 1. Primitve "property" - 0x002
// 2. Object "property" - 0x003
// 3. Function "method" - 0x004

 var person = new Object();

 person["firstname"] = "Tony";
 person["lastname"] = "Alicea";

 var firstNameProperty = "firstname";

 console.log(person);
 console.log(person[firstNameProperty]);

 console.log(person.firstname);
 console.log(person.lastname);

person.address = new Object();
person.address.street = "111 Main St.";
person.address.city = "New York";
person.address.state = "NY";


console.log(person.address);
console.log(person["address"]["state"]);
