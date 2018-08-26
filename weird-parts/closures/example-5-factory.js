function makeGreeting(language) {

  return function(firstname, lastname) {

    if (language === 'en') {
    console.log('Hello ' + firstname + ' ' + lastname);
  }

    if (language === 'es') {
      console.log('Hola ' + firstname + ' ' + lastname);
    }
  }
}

// own execution context
var greetEnglish = makeGreeting('en');
// own execution context
var greetSpanish = makeGreeting('es');

greetEnglish('John', 'Doe');
greetSpanish('Viet', 'Truong');

// Global execution context = greetEnglish, greetSpanish,makeGreeting()
// makeGreeting stack = language'en'
