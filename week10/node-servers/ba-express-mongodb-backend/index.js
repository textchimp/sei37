// DB initialisation
const { MongoClient, ObjectId } = require('mongodb');
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

app.use( express.json() ); // Enable support for JSON-encoded request bodies (i.e. posted formdata)
app.use( express.urlencoded({ extended: true }) );


app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT} ...`);
});

// Routes

// GET /flights : JSON index of all flights
app.get('/flights', (req, res) => {
  // res.json([1, 2, 3]);

  db.collection('flights').find().toArray( (err, result) => {

    if( err ){
      console.log('Query error: ', err );
      return res.sendStatus(500); // report error as HTTP 500 to browser
    }

    res.json( result ); // send the DB result back to the browser as JSON

  });

}); // GET /flights


app.get('/flights/search/:origin/:destination', (req, res) => {
  // res.json( req.params );

  // ActivRecord:
  // @flights = Flight.where origin: params[:origin], destination: params[:destination]

  db.collection('flights').find({
    origin: req.params.origin,
    destination: req.params.destination
  })
  .toArray( (err, results) => {

    if( err ){
      res.sendStatus(500);
      return console.log('Error searching flights:', err);
    }

    res.json( results );

  });

}); // get /flights/search/:origin/:destination


// GET /flights/BA123 (or similar)
app.get('/flights/:flight_number', (req, res) => {
  // res.json( req.params );

  db.collection('flights').findOne(
    { flight_number: req.params.flight_number },
    (err, flight) => {

      if( err ){
        res.sendStatus(500);
        return console.log('Error finding flight', err);
      }

      res.json( flight );

    } // query callback
  );

}); // GET /flights/:flight_number


// POST /reservations (book a seat)
app.post('/reservations', (req, res) => {
  // res.json( req.body );

// TODO: STOP USING FAKE USER, implement the damn user auth
  const FAKE_USER_ID = 10;

  console.log('POST /reservations', req.body);

  db.collection('flights').updateOne(
    // 1. Query to find the document you want to update:
    { _id: ObjectId(req.body.flight_id) },

    // 2. Specify the changes to make, i.e. the update data:
    {
      $push: {
        reservations: {
          row: req.body.row,
          col: req.body.col,
          user_id: FAKE_USER_ID
        }
      } // $push
    }, // update arg

    // 3. Callback to run when the update is finished:
    (err, result) => {

      if( err ){
        res.sendStatus( 500 );
        return console.log('Error saving reservation', err);
      }

      // Need to send back the kind of data the
      // ReservationConfirm component is expecting,
      // so it will actually update the seating diagram
      // correctly:

      console.log('update done:', result);

      res.json({
        row: req.body.row,
        col: req.body.col,
        user_id: FAKE_USER_ID
      });

    }
  );


}); // POST /reservations
//  -- .update()


// app.post('/login')
  // - how to check?
  // - and if successful, how to create a JWT and
  // send it back as the response?

// TEST using curl:
// curl -XPOST -d '{"email":"one@one.com", "password":"chicken"}' http://localhost:1337/login -H 'content-type: application/json'

// How to mark certain routes as logged-in only?
