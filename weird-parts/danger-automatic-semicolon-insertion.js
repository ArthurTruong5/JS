// This will be undefined. JavaScript will automatically add a semicolon after return. To prevent this add { next to return
function getPerson() {

  return
  {
    firstname: 'Tony'
  }

}

console.log(getperson());

// This is the correct way
function getPerson() {

  return {
    firstname: 'Tony'
  }

}

console.log(getperson());
