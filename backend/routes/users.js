const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Route to create a new user
router.post("/users", async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    const newUser = new User({ username, password, email, role });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating user", error: err.message });
  }
});

// Route to get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting users", error: err.message });
  }
});

// Route to get a single user by ID
router.get("/users/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error getting user", error: err.message });
  }
});

// Route to update a user by ID
router.put("/users/:userId", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      {
        new: true, // Return the updated user
      }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
});

// Route to delete a user by ID
router.delete("/users/:userId", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
});

module.exports = router;
