const axios = require('axios');
const express = require('express');
const app = express();  // create the server object
//     node  index.js 8000
// argv[0]  [1]       [2]
const PORT = process.argv[2] || 1337;

app.use( express.static('public') );

const ejs = require('ejs');
app.set('view-engine', ejs); // use the ejs plugin for templates

app.listen(PORT, () => {
  console.log(`Now serving on http://localhost:${PORT} ...`);
});

// Sinatra:
// get '/' do
//
// end

app.get('/', (req, res) => {
  console.log('Root route requested!!');
  res.send('<h1>Hello World part 2!</h1>');
});

app.get('/guestbook', (req, res) => {
  res.send('<h2>Sign my guestbook!!!</h2><br><img src="http://placekitten.com/300/300">');
});

// Dynamic URLs
app.get('/hello/:person', (req, res) => {
  console.log( req.params );
  // res.send(`Hello, ${ req.params.person }`);

  res.render('greeting.ejs', { name: req.params.person });

});

// Dynamic URL, multiple variables
app.get('/hello/:person/favourite/:food', (req, res) => {
  console.log( req.params );
  res.send(`Hello, ${ req.params.person }.<br>Your favourite food is ${ req.params.food}.`);
});


// Sending a JSON response
app.get('/dogs.json', (req, res) => {
  const data = [
    { name: 'Ruby',   age: 3, goodBoy: true },
    { name: 'Fido',   age: 4, goodBoy: true },
    { name: 'Killer', age: 2, goodBoy: false },
  ];

  res.json( data );
});


/// Query a remote API and forward the response back
// to the browser
app.get('/trivia', (req, res) => {

  // Use axios to make a further request to the Numbers API
  // and send the response back to the browser:
  axios.get('http://numbersapi.com/random/trivia?json')
  .then( axiosResponse => {
    // Forward the API response to the browser
    res.json( axiosResponse.data );
  })
  .catch( err => console.log(err) );


});



// Fallback route handler: use this callback
// if none of the other route handlers match the path
app.use( (req, res) => {
  res.sendStatus(404);
})
