function a() {
  console.log(this);
  this.newvariable = 'Hello';
}

var b = function() {
  console.log(this);
}

a();
b();
console.log(newvariable);


// Object method

var c = {
  name: 'The c object',
  log: function() {
      var self = this;
    self.name = 'Updated c object';
    console.log(self);

    var setname = function(newname) {
      self.name = newname;
    }
    setname('Updated again! the c object');
    console.log(self);
  }
}

c.log();
