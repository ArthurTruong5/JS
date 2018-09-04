const express = require('express')
const app = express()

const port = 3000;


const exphbs = require('express')

// Middleware code
app.use((req, res, next) => {
  console.log('middleware running')
})

app.get('/about', (req, res) => {
    res.send('About')
});

// Call back function
app.get('/', (req, res) => {
    res.send('Hello Express')
});


// Start a server
app.listen(port, () => console.log(`Server started on prot ${port}`));
