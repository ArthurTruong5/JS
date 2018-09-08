angular.module('TestApp', []);

angular.module('TestApp')
  .controller('MainController', ctrlFunc);

function ctrlFunc() {
  this.message = 'Hello';
}
