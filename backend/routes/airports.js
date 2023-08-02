// routes/airports.js
const express = require('express');
const router = express.Router();
const Airport = require('../models/airport');

// Route to create a new airport
router.post('/airports', async (req, res) => {
  try {
    const { name, code, location } = req.body;
    const newAirport = new Airport({ name, code, location });
    const savedAirport = await newAirport.save();
    res.status(201).json(savedAirport);
  } catch (err) {
    res.status(400).json({ message: 'Error creating airport', error: err.message });
  }
});

// Route to get all airports
router.get('/airports', async (req, res) => {
  try {
    const airports = await Airport.find();
    res.json(airports);
  } catch (err) {
    res.status(500).json({ message: 'Error getting airports', error: err.message });
  }
});

// Route to get a single airport by ID
router.get('/airports/:airportId', async (req, res) => {
  try {
    const airport = await Airport.findById(req.params.airportId);
    if (!airport) {
      return res.status(404).json({ message: 'Airport not found' });
    }
    res.json(airport);
  } catch (err) {
    res.status(500).json({ message: 'Error getting airport', error: err.message });
  }
});

// Route to update an airport by ID
router.put('/airports/:airportId', async (req, res) => {
  try {
    const updatedAirport = await Airport.findByIdAndUpdate(req.params.airportId, req.body, {
      new: true,
    });
    if (!updatedAirport) {
      return res.status(404).json({ message: 'Airport not found' });
    }
    res.json(updatedAirport);
  } catch (err) {
    res.status(500).json({ message: 'Error updating airport', error: err.message });
  }
});

// Route to delete an airport by ID
router.delete('/airports/:airportId', async (req, res) => {
  try {
    const deletedAirport = await Airport.findByIdAndDelete(req.params.airportId);
    if (!deletedAirport) {
      return res.status(404).json({ message: 'Airport not found' });
    }
    res.json({ message: 'Airport deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting airport', error: err.message });
  }
});

module.exports = router;
