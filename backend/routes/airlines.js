// routes/airlines.js
const express = require('express');
const router = express.Router();
const Airline = require('../models/airline');

// Route to create a new airline
router.post('/airlines', async (req, res) => {
  try {
    const { name, code } = req.body;
    const newAirline = new Airline({ name, code });
    const savedAirline = await newAirline.save();
    res.status(201).json(savedAirline);
  } catch (err) {
    res.status(400).json({ message: 'Error creating airline', error: err.message });
  }
});

// Route to get all airlines
router.get('/airlines', async (req, res) => {
  try {
    const airlines = await Airline.find();
    res.json(airlines);
  } catch (err) {
    res.status(500).json({ message: 'Error getting airlines', error: err.message });
  }
});

// Route to get a single airline by ID
router.get('/airlines/:airlineId', async (req, res) => {
  try {
    const airline = await Airline.findById(req.params.airlineId);
    if (!airline) {
      return res.status(404).json({ message: 'Airline not found' });
    }
    res.json(airline);
  } catch (err) {
    res.status(500).json({ message: 'Error getting airline', error: err.message });
  }
});

// Route to update an airline by ID
router.put('/airlines/:airlineId', async (req, res) => {
  try {
    const updatedAirline = await Airline.findByIdAndUpdate(req.params.airlineId, req.body, {
      new: true,
    });
    if (!updatedAirline) {
      return res.status(404).json({ message: 'Airline not found' });
    }
    res.json(updatedAirline);
  } catch (err) {
    res.status(500).json({ message: 'Error updating airline', error: err.message });
  }
});

// Route to delete an airline by ID
router.delete('/airlines/:airlineId', async (req, res) => {
  try {
    const deletedAirline = await Airline.findByIdAndDelete(req.params.airlineId);
    if (!deletedAirline) {
      return res.status(404).json({ message: 'Airline not found' });
    }
    res.json({ message: 'Airline deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting airline', error: err.message });
  }
});

module.exports = router;
