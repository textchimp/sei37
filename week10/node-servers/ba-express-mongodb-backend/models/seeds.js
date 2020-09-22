const mongoose = require('mongoose');

// Load the model files so we can perform queries with them
const Flight = require('../models/Flight');
const User   = require('../models/User');

const bcrypt = require('bcrypt'); // for user passwords

// Establish a connection using mongoose
mongoose.connect('mongodb://localhost/ba', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Only when the connection is open, can we start seeding
db.once('open', async () => {

  // empty the collections first
  await Flight.deleteMany({});
  await User.deleteMany({});

  const users = await seedUsers();
  const flights = await seedFlights();

  // Now that we have created flights & users, we can pass them
  // in to our reservation function to share the IDs between them.
  await seedReservations(flights, users);

  // Query the DB and print out the results, to
  // check that everything worked.
  await printReport();

  console.log(`Created ${ users.length } Users.`);
  console.log(`Created ${ flights.length } Flights.`);
  console.log('Done.');

  process.exit(0); // Finished!

}); // db.once() initialiser



const seedFlights = async () => {

  try {

    return await Flight.create([
      {
        flightNumber: 'BA123',
        origin: 'SYD',
        destination: 'MEL',
        departureDate: '2020-10-01T04:20:00',
        airplane: { name: '737', rows: 40, cols: 6 },
      },
      {
        flightNumber: 'BA256',
        origin: 'SYD',
        destination: 'MEL',
        departureDate: '2020-10-02T11:20:00',
        airplane: { name: '757', rows: 20, cols: 3 },
      },
      {
        flightNumber: 'BA512',
        origin: 'SYD',
        destination: 'SIN',
        departureDate: '2020-10-03T11:20:00',
        airplane: { name: '767 Max', rows: 80, cols: 8 },
      }
    ]);

  } catch( err ){
    console.warn( 'Error creating flights:', err );
    process.exit(1);
  }

}; // seedFlights


const seedUsers = async () => {

  try {

    return await User.create([
      {
        name: 'Test User 1',
        email: 'one@one.com',
        passwordDigest: bcrypt.hashSync('chicken', 10),
        bio: 'Rando 1',
      },
      {
        name: 'Test User 2',
        email: 'two@two.com',
        passwordDigest: bcrypt.hashSync('chicken', 10),
        bio: 'Rando 2',
      },
      {
        name: 'Test User 3',
        email: 'three@three.com',
        passwordDigest: bcrypt.hashSync('chicken', 10),
        bio: 'Rando 3',
      }
    ]);

  } catch(err) {
    console.log('Error creating users:', err);
    process.exit(1);
  }

}; // seedUsers


const seedReservations = async (flights, users) => {

  // Shorthand access to all the flights & users:
  const [f1, f2, f3] = flights;
  const [u1, u2, u3] = users;

  const u1Res = await u1.saveReservations([
    {row: 1, col: 1, flight: f1 },
    {row: 1, col: 2, flight: f1 },
    {row: 1, col: 1, flight: f2 },
    {row: 1, col: 2, flight: f2 },
    {row: 1, col: 1, flight: f3 },
    {row: 1, col: 2, flight: f3 },
  ]);

  const u2Res = await u2.saveReservations([
    {row: 2, col: 1, flight: f1 },
    {row: 2, col: 2, flight: f1 },
    {row: 2, col: 1, flight: f2 },
    {row: 2, col: 2, flight: f2 },
    {row: 2, col: 1, flight: f3 },
    {row: 2, col: 2, flight: f3 },
  ]);

  const u3Res = await u3.saveReservations([
    {row: 3, col: 1, flight: f1 },
    {row: 3, col: 2, flight: f1 },
    {row: 3, col: 1, flight: f2 },
    {row: 3, col: 2, flight: f2 },
    {row: 3, col: 1, flight: f3 },
    {row: 3, col: 2, flight: f3 },
  ]);

  // console.log('saveReservations result', {u1Res, u2Res, u3Res});

  // By using the custom model method saveReservations, which
  // saves to both the User and the Flight, we don't have to
  // run all the code below which separately saves the reservations
  // first to the User, then separately to the flights:

  // Create reservations in User docs

  // const u1Updated = await u1.updateOne({
  //   reservations: [
  //     {row: 1, col: 1, flight: f1._id },
  //     {row: 1, col: 2, flight: f1._id },
  //     {row: 1, col: 1, flight: f2._id },
  //     {row: 1, col: 2, flight: f2._id },
  //     {row: 1, col: 1, flight: f3._id },
  //     {row: 1, col: 2, flight: f3._id },
  //   ]
  // });
  //
  // const u2Updated = await u2.updateOne({
  //   reservations: [
  //     { row: 2, col: 1, flight: f1._id },
  //     { row: 2, col: 2, flight: f1._id },
  //     { row: 2, col: 1, flight: f2._id },
  //     { row: 2, col: 2, flight: f2._id },
  //     { row: 2, col: 1, flight: f3._id },
  //     { row: 2, col: 2, flight: f3._id },
  //   ]
  // });
  //
  // const u3Updated = await u3.updateOne({
  //   reservations: [
  //     { row: 3, col: 1, flight: f1._id },
  //     { row: 3, col: 2, flight: f1._id },
  //     { row: 3, col: 1, flight: f2._id },
  //     { row: 3, col: 2, flight: f2._id },
  //     { row: 3, col: 1, flight: f3._id },
  //     { row: 3, col: 2, flight: f3._id },
  //   ]
  // });



  // Now, since we're "denormalizing" some of this data,
  // i.e. duplicating some of the same information across
  // different collections (here, the Flight doc stores some
  // reservation info: the row, column, & user, as well
  // as the User doc storing that info), we have to update
  // each Flight with reservation info from the users.
  //
  // This is a lot more work to do during the creation
  // of these documents (and the editing), but the payoff is
  // that when we load a Flight, we have all the reservation
  // info we need to draw the all-important seating diagram,
  // without needing to also query the User collection.

  // const f1Updated = await f1.updateOne({ $push: {
  //   reservations: [
  //     { row: 1, col: 1, user: u1._id },
  //     { row: 1, col: 2, user: u1._id },
  //     { row: 2, col: 1, user: u2._id },
  //     { row: 2, col: 2, user: u2._id },
  //     { row: 3, col: 1, user: u3._id },
  //     { row: 3, col: 2, user: u3._id },
  //   ]
  // }});
  //
  // const f2Updated = await f2.updateOne({ $push: {
  //   reservations: [
  //     { row: 1, col: 1, user: u1._id },
  //     { row: 1, col: 2, user: u1._id },
  //     { row: 2, col: 1, user: u2._id },
  //     { row: 2, col: 2, user: u2._id },
  //     { row: 3, col: 1, user: u3._id },
  //     { row: 3, col: 2, user: u3._id },
  //   ]
  // }});
  //
  // const f3Updated = await f3.updateOne({ $push: {
  //   reservations: [
  //     { row: 1, col: 1, user: u1._id },
  //     { row: 1, col: 2, user: u1._id },
  //     { row: 2, col: 1, user: u2._id },
  //     { row: 2, col: 2, user: u2._id },
  //     { row: 3, col: 1, user: u3._id },
  //     { row: 3, col: 2, user: u3._id },
  //   ]
  // }});

  // We could return the status of all the updates:
  // return [u1Updated, u2Updated, u3Updated, f1Updated, f2Updated, f3Updated];

}; // seedReservations()



const printReport = async () => {

  // console colours (see https://stackoverflow.com/a/41407246)
  const yellow = '\x1b[33m',
    green = '\x1b[32m',
    blue = '\x1b[34m',
    reset = '\x1b[0m';

  const flightCheck = await Flight.find()
  .populate({
    path: 'reservations.user', // Mongoose populates this association
    // model: 'User'
  });

  flightCheck.forEach( f => {
    console.log(
      green, `${f.flightNumber}:`, yellow, `${f.origin} -> ${f.destination}`,
      blue, `(${f.departureDate.toLocaleString()})`,  reset,
      f.reservations.map(r =>({
        row: r.row, col: r.col, user: r.user.name
      }))
    );
  });


  const userCheck = await User.find()
  .populate({
    path: 'reservations.flight', // Mongoose populates this association
    // model: 'Flight'
  });

  userCheck.forEach(u => {
    console.log(
      yellow, `${u.name}`, green, `(${u.email}):`, reset,
      u.reservations.map(r => (
        { row: r.row, col: r.col, flight: r.flight.flightNumber }
      ))
    );
  });

}; // printReport()
