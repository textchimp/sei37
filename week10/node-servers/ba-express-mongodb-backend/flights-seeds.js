
const MongoClient = require('mongodb').MongoClient;
let db;

MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {

  // if( err ) return console.log( err );
  if( err ){
    console.log( err );
    return; // early return on error
  }

  db = client.db( 'ba' ); // success!
  console.log('Connected, using db: ba');

  db.collection('flights').deleteMany({}, (err, result) => {
    if(err) return console.log('Failed to delete flights', err);
    insertFlights(); // add the seeds using this function
  });

}); // .connect()


const insertFlights = () => {

  db.collection('flights').insertMany([
    {
      flight_number: 'BA123',
      origin: 'SYD',
      destination: 'MEL',
      departure_date: new Date('2020-10-01T04:20:00Z'),
      airplane: { name: '737', rows: 40, cols: 6 },
      reservations: [
        { row: 10, col: 2, user_id: 10 },
        { row: 11, col: 3, user_id: 10 },
        { row: 12, col: 4, user_id: 11 },
      ]
    },
    {
      flight_number: 'BA256',
      origin: 'SYD',
      destination: 'MEL',
      departure_date: new Date('2020-10-02T011:20:00Z'),
      airplane: { name: '757', rows: 20, cols: 3 },
      reservations: [
        { row: 1, col: 1, user_id: 10, passenger: { email: 'test@guy.com', name: 'Guy Rando' } },
        { row: 2, col: 2, user_id: 11 },
        { row: 3, col: 3, user_id: 11 },
      ]
    },
    {
      flight_number: 'BA512',
      origin: 'SYD',
      destination: 'SIN',
      departure_date: new Date('2020-10-03T011:20:00Z'),
      airplane: { name: '767 Max', rows: 80, cols: 8 },
      reservations: [
        { row: 11, col: 1, user_id: 10 },
        { row: 12, col: 2, user_id: 11 },
        { row: 13, col: 3, user_id: 11 },
      ]
    }
  ],
    (err, result) => {

      if( err ) return console.log('Error adding flights', err);

      console.log(`Success! Added ${ result.insertedCount } flights.`);

      process.exit(0); // quit the program ( 0 = no errors for shell )

    }
  );  // insertMany()

}; // insertFlights()
