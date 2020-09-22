const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordDigest: String,
  createdAt: { type: Date, default: Date.now },

  reservations: [{
    row: Number,
    col: Number,
    paid: Boolean,
    createdAt: { type: Date, default: Date.now },

    // Reservations belong to a Flight:
    // This syntax lets us set a Flight doc _id field here,
    // and Mongoose will fill the association for when we .populate()
    // (see the seeds.js file)
    flight: {
      ref: 'Flight',
      type: mongoose.Schema.Types.ObjectId,
    }

  }]

  // If you wanted to store flights association directly in a User:
  //
  // flights: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Flight'
  // }]

});


// Not an arrow function because Mongoose uses 'this'
UserSchema.methods.saveReservation = async function(res){

  // Using this custom model method instead of creating reservations using
  // the default Mongoose updateOne(), save(), or create() causes the
  // reservation to be saved to BOTH the User AND the Flight
  try {

    // save into Flight
    await res.flight.updateOne({
      $push: {
        reservations: {
          row: res.row,
          col: res.col,
          user: this  //._id
        }
      }
    });

    // save to this User
    await this.updateOne({
      $push: {
        reservations: {
          row: res.row,
          col: res.col,
          flight: res.flight //._id
        }
      }
    });

    return this;

  } catch( err ){
    console.log('Error updating flight', err, res.flight);
    return err;
  }
}; //saveReservation()



// This is just to make it easier to save multiple reservations
// at once; mostly for the seeds file
UserSchema.methods.saveReservations = async function(reservations){

  // Use a for..of loop here to run in sequence; using .forEach
  // causes unexpected results due to asychronous nature of
  // callbacks in forEach
  // see https://2ality.com/2016/10/asynchronous-iteration.html
  for( const res of reservations ){
    await this.saveReservation( res );
  } // for res of reservations

  return this;
}; // saveReservations()


module.exports = mongoose.model('User', UserSchema);
