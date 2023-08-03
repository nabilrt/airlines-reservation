// cityModel.js
const mongoose = require("mongoose");

// Define the schema for the cities collection
const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    required: true,
  },
  population: {
    type: Number,
  },
  // Add more fields as needed
});

// Create the City model
const City = mongoose.model("City", citySchema);

module.exports = City;
