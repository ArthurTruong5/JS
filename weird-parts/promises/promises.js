var promisesArray = [
  axios.get("www.test.com/random")
  axios.get("www.test.com/random")
]

// Instead of all, you can say race.
// then, catch, all, race

Promise.all(promisesArray);
  .then(data => {
    console.log(data);
  })
  .catch(err => console.log(err));
