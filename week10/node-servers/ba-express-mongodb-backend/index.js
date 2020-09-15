// DB initialisation
const { MongoClient, ObjectId } = require('mongodb');
let db;

MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {

  if( err ) return console.log( err );

  db = client.db( 'ba' ); // success!
  console.log('Connected, using db: ba');

}); // .connect()


// For checking passwords on login
const bcrypt = require('bcrypt');

// For creating signed login tokens to send to the frontend
// (like a session cookie in Rails)
const jwt = require('jsonwebtoken');

// For decoding/checking JWT tokens in the header of requests:
const jwtAuthenticate = require('express-jwt');
// Use this function to lock down any route that should
// be for logged-in users only
const checkAuth = () => {
  return jwtAuthenticate({
    secret: SERVER_SECRET_KEY,
    algorithms:  ['HS256']
  });
};

// TODO: Move this out of server file, into .env or .bash_profile etc
const SERVER_SECRET_KEY = 'yourSecretKeyHereCHICKEN';


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


app.get('/flights/search/:origin/:destination', checkAuth(), (req, res) => {
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

// Login form on frontend submits to here (using Ajax)
app.post('/login', (req, res) => {
  console.log('posted data:', req.body);
  // res.json( req.body ); // echo back the POSTed formdata

  const { email, password } = req.body;

  db.collection('users').findOne({ email }, (err, user) => {

    if( err ){
      res.status(500).json({ message: 'Server error' });
      return console.log('Error retrieving user', err);
    }

    console.log('User found:', user);
    // res.json( user );

    // Check that we actually found a user with the specified email,
    // and also that the password given matches the password for
    // that user
    if( user && bcrypt.compareSync(password, user.passwordDigest) ){
      // Successful login!

      // Generate a signed JWT token which contains the user data
      const token = jwt.sign(
        {
          _id: user._id,
          email: user.email,
          name: user.name
        },
        SERVER_SECRET_KEY,
        { expiresIn: '72h' }
      );

      res.json({ user, token, success: true });

    } else {
      // User not found, or passwords don't match - failed login
      res.status(401).json({ message: 'Authentication failed' });
    }


  }); // find user

}); // POST /login



// Check authentication for this route, i.e. logged-in users only
app.get('/flights-seekrit', checkAuth(), (req, res) => {
  res.json({ seekrit: 'For British Eyes Only', user: req.user });
});

// Define an error handler function for express to use
// whenever there is an authentication error
app.use( (err, req, res, next) => {
  if( err.name === 'UnauthorizedError' ){
    console.log('Unauthorized Request:', req.path);
    res.status(401).json({ error: 'Invalid token' });
  }
});


// TEST using curl:
// curl -XPOST -d '{"email":"one@one.com", "password":"chicken"}' http://localhost:1337/login -H 'content-type: application/json'

// How to mark certain routes as logged-in only?
