
const bcrypt = require('bcrypt');

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

  db.collection('users').deleteMany({}, (err, result) => {
    if(err) return console.log('Failed to delete users', err);
    insertUsers(); // add the seeds using this function
  });

}); // .connect()


const insertUsers = () => {

  db.collection('users').insertMany([
    {
      name: 'Test User 1',
      email: 'one@one.com',
      passwordDigest: bcrypt.hashSync('chicken', 10),
      bio: 'Rando 1'
    },
    {
      name: 'Test User 2',
      email: 'two@two.com',
      passwordDigest: bcrypt.hashSync('chicken', 10),
      bio: 'Rando 2'
    },
    {
      name: 'Test User 3',
      email: 'three@three.com',
      passwordDigest: bcrypt.hashSync('chicken', 10),
      bio: 'Rando 3'
    },

  ],
    (err, result) => {

      if( err ) return console.log('Error adding users', err);

      console.log(`Success! Added ${ result.insertedCount } users.`);

      process.exit(0); // quit the program ( 0 = no errors for shell )

    }
  );  // insertMany()

}; // insertUsers()
