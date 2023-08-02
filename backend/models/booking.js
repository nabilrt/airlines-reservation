// models/booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flight_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  booking_time: { type: Date, default: Date.now },
  passengers: [
    {
      name: { type: String, required: true },
      age: { type: Number, required: true },
    },
  ],
  total_price: { type: Number, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
