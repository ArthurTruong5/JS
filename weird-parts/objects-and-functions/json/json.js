// Json

// JavaScript Object Notation

// OBJECT TO JSON
// BELOW IS AN OBJECT
var objectLiteral = {
  firstname: 'Mary',
  isAProgrammer: true
}

console.log(JSON.stringify(objectLiteral));

// JSON TO OBJECT
// BELOW IS A JSON
var jsonValue = JSON.parse('{ "firstname": "Mary","isAProgrammer": true }');


console.log(jsonValue);

// xml example

// <object>
//   <firstname>mary</firstname>
//   <isAProgrammer>true</isAProgrammer>
// </object>
