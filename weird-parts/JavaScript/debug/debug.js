const students = ["Mary", "Long", "Jesse", "Andrew", "Arthur", "Allen"];

const instructors = ["Nands", "Alex", "Bianca", "Saad", "Jamie"];

// of will point to the = values
// in point 0,1,2,3,4,5 = index

const intro = (name) => {
  console.log(`hi ${name}`);
}
for (let student of students){
  intro(student);
}
for (let teacher of instructors) {
  intro(teacher);
}
