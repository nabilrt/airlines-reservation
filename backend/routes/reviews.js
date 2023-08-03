// reviewsController.js
const express = require("express");
const router = express.Router();
const Review = require("../models/review");

// API endpoint to create a new review
router.post("/reviews", async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding review", error: error.message });
  }
});

// API endpoint to get all reviews
router.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reviews", error: error.message });
  }
});

// API endpoint to get a single review by ID
router.get("/reviews/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching review", error: error.message });
  }
});

// API endpoint to update a review by ID
router.put("/reviews/:id", async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res
      .status(200)
      .json({ message: "Review updated successfully", review: updatedReview });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating review", error: error.message });
  }
});

// API endpoint to delete a review by ID
router.delete("/reviews/:id", async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndRemove(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res
      .status(200)
      .json({ message: "Review deleted successfully", review: deletedReview });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting review", error: error.message });
  }
});

module.exports = router;
