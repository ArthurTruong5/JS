const express = require('express')
const app = express()

// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
