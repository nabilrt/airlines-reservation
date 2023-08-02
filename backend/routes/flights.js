// routes/flights.js
const express = require('express');
const router = express.Router();
const Flight = require('../models/flight');

// Route to create a new flight
router.post('/flights', async (req, res) => {
  try {
    const {
      airline_id,
      departure_airport_id,
      arrival_airport_id,
      departure_time,
      arrival_time,
      available_seats,
      price,
    } = req.body;
    const newFlight = new Flight({
      airline_id,
      departure_airport_id,
      arrival_airport_id,
      departure_time,
      arrival_time,
      available_seats,
      price,
    });
    const savedFlight = await newFlight.save();
    res.status(201).json(savedFlight);
  } catch (err) {
    res.status(400).json({ message: 'Error creating flight', error: err.message });
  }
});

// Route to get all flights
router.get('/flights', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: 'Error getting flights', error: err.message });
  }
});

// Route to get a single flight by ID
router.get('/flights/:flightId', async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.flightId);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.json(flight);
  } catch (err) {
    res.status(500).json({ message: 'Error getting flight', error: err.message });
  }
});

// Route to update a flight by ID
router.put('/flights/:flightId', async (req, res) => {
  try {
    const updatedFlight = await Flight.findByIdAndUpdate(req.params.flightId, req.body, {
      new: true,
    });
    if (!updatedFlight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.json(updatedFlight);
  } catch (err) {
    res.status(500).json({ message: 'Error updating flight', error: err.message });
  }
});

// Route to delete a flight by ID
router.delete('/flights/:flightId', async (req, res) => {
  try {
    const deletedFlight = await Flight.findByIdAndDelete(req.params.flightId);
    if (!deletedFlight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.json({ message: 'Flight deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting flight', error: err.message });
  }
});

module.exports = router;
