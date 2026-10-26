
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

const feedbackSchema = new mongoose.Schema({
  q1: String,
  q2: String,
  q3: String,
  q4: String,
  q5: String,
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

app.get("/", (req, res) => {
  res.send("Online Survey API is running");
});

app.post("/api/feedback", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();

    res.status(201).json({
      message: "Feedback submitted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error storing feedback",
    });
  }
});

app.get("/api/getfeedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({
      submittedAt: -1,
    });

    res.json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving feedback",
    });
  }
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const PORT = process.env.PORT || 8080;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

startServer();
