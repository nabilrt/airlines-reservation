// app.js
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors package

const userRoutes = require("./routes/users");
const airlineRoutes = require("./routes/airlines");
const airportRoutes = require("./routes/airports");
const flightRoutes = require("./routes/flights");
const bookingRoutes = require("./routes/bookings");
const cityRoutes = require("./routes/cities");
const reviewRoutes = require("./routes/reviews");

const app = express();
const PORT = process.env.PORT || 9000;

// Body parser middleware
app.use(bodyParser.json());

app.use(cors());

// Connect to MongoDB
const MONGODB_URI = "mongodb://127.0.0.1:27017/airlines-reservation"; // Replace this with your MongoDB connection URI

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
app.get("/", (req, res) => {
  res.send("Connected");
});
// Use routes
app.use("/api", userRoutes);
app.use("/api", airlineRoutes);
app.use("/api", airportRoutes);
app.use("/api", flightRoutes);
app.use("/api", bookingRoutes);
app.use("/api", cityRoutes);
app.use("/api", reviewRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
