const Question = require("../models/Question");

// Fetch all questions
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new question
const addQuestion = async (req, res) => {
  const { question, options, correctAnswer } = req.body;

  try {
    const newQuestion = await Question.create({
      question,
      options,
      correctAnswer,
    });
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllQuestions, addQuestion };
