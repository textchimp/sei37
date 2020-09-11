// DB initialisation
const MongoClient = require('mongodb').MongoClient;
let db;

MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {

  if( err ) return console.log( err );

  db = client.db( 'ba' ); // success!
  console.log('Connected, using db: ba');

}); // .connect()

// Express server initialisation
const express = require('express');
const app = express();
const PORT = 1337;

const cors = require('cors');
app.use( cors() );  // Use cors as Express middleware, i.e. set the CORS allow header

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT} ...`);
});

// Routes

// GET /flights : JSON index of all flights
app.get('/flights', (req, res) => {
  //res.json([1, 2, 3]);

  db.collection('flights').find({}).toArray( (err, result) => {

    if( err ){
      return res.sendStatus(500); // report error as HTTP 500 to browser
    }

    res.json( result ); // send the DB result back to the browser as JSON

  });

}); // GET /flights


// app.get('/flights/search/:origin/:destination')
//  -- do a .find({}) looking for matching origin and destinations

// app.get('/flights/:id')
//  -- .find({}) , maybe using flight_number instead of long _id thing

// app.post('/reservations')
//  -- .update()
