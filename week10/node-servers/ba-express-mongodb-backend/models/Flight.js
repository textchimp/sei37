const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightNumber: String,
  origin: String,
  destination: String,
  departureDate: Date,
  airplane: {
    name: String,
    rows: Number,
    cols: Number
  },
  // a flight can have many nested reservations
  reservations: [{
    row: Number,
    col: Number,
    createdAt: { type: Date, default: Date.now },
    // Reservations belong to a User:
    // This syntax lets us set a User document's _id field here,
    // and Mongoose will fill the association for us when we .populate()
    // (see the seeds.js file)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
});

module.exports = mongoose.model('Flight', flightSchema);
