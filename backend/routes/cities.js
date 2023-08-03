// citiesController.js
const express = require("express");
const router = express.Router();
const City = require("../models/city");

// API endpoint to create a new city
router.post("/cities", async (req, res) => {
  try {
    const newCity = new City(req.body);
    await newCity.save();
    res.status(201).json({ message: "City added successfully", city: newCity });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding city", error: error.message });
  }
});

// API endpoint to get all cities
router.get("/cities", async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json(cities);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cities", error: error.message });
  }
});

// API endpoint to get a single city by ID
router.get("/cities/:id", async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }
    res.status(200).json(city);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching city", error: error.message });
  }
});

// API endpoint to update a city by ID
router.put("/cities/:id", async (req, res) => {
  try {
    const updatedCity = await City.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedCity) {
      return res.status(404).json({ message: "City not found" });
    }
    res
      .status(200)
      .json({ message: "City updated successfully", city: updatedCity });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating city", error: error.message });
  }
});

// API endpoint to delete a city by ID
router.delete("/cities/:id", async (req, res) => {
  try {
    const deletedCity = await City.findByIdAndRemove(req.params.id);
    if (!deletedCity) {
      return res.status(404).json({ message: "City not found" });
    }
    res
      .status(200)
      .json({ message: "City deleted successfully", city: deletedCity });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting city", error: error.message });
  }
});

module.exports = router;
