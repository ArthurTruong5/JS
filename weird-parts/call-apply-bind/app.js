var person = {
  firstname: 'John',
  lastname: 'Doe',
  getFullName: function() {
    var fullname = this.firstname + ' ' + this.lastname;
    return fullname;
  }
}

var logName = function(lang1,lang2) {
  console.log('Logged: ' + this.getFullName());
  console.log('Arguments: ' + lang1 + ' ' + lang2);
  console.log('------------');
}

var logPersonName = logName.bind(person);

logPersonName('en');
