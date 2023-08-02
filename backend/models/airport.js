// models/airport.js
const mongoose = require('mongoose');

const airportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true },
  },
});

const Airport = mongoose.model('Airport', airportSchema);

module.exports = Airport;
