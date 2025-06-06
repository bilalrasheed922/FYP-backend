// This will create schema of a questions 


const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
});

module.exports = mongoose.model("Question", questionSchema);
