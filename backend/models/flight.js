// models/flight.js
const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  airline_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airline",
    required: true,
  },
  departure_airport_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airport",
    required: true,
  },
  arrival_airport_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airport",
    required: true,
  },
  departure_time: { type: Date, required: true },
  arrival_time: { type: Date, required: true },
  available_seats: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
