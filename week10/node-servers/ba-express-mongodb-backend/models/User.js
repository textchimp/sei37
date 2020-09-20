const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordDigest: String,
  createdAt: { type: Date, default: Date.now },
  reservations: [{
    row: Number,
    col: Number,
    paid: Boolean,
    // Reservations belong to a Flight:
    // This syntax lets us set a Flight doc _id field here,
    // and Mongoose will fill the association for when we .populate()
    // (see the seeds.js file)
    flight: {
      ref: 'Flight',
      type: mongoose.Schema.Types.ObjectId,
    },
    createdAt: { type: Date, default: Date.now },
  }]

  // If you wanted to store flights association directly in a User:
  //
  // flights: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Flight'
  // }]

});

module.exports = mongoose.model('User', userSchema);
