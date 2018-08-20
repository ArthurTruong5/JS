function greet(name) {
  // || doesn't just return true or false
  name = name || '<Your name here>';
  console.log('Hello ' + name);
}

greet();
