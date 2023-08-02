// routes/bookings.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

// Route to create a new booking
router.post('/bookings', async (req, res) => {
  try {
    const { user_id, flight_id, passengers, total_price } = req.body;
    const newBooking = new Booking({ user_id, flight_id, passengers, total_price });
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(400).json({ message: 'Error creating booking', error: err.message });
  }
});

// Route to get all bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error getting bookings', error: err.message });
  }
});

// Route to get a single booking by ID
router.get('/bookings/:bookingId', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Error getting booking', error: err.message });
  }
});

// Route to update a booking by ID
router.put('/bookings/:bookingId', async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.bookingId, req.body, {
      new: true,
    });
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(updatedBooking);
  } catch (err) {
    res.status(500).json({ message: 'Error updating booking', error: err.message });
  }
});

// Route to delete a booking by ID
router.delete('/bookings/:bookingId', async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.bookingId);
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting booking', error: err.message });
  }
});

module.exports = router;
