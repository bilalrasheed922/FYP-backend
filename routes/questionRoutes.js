const express = require("express");
const { getAllQuestions, addQuestion } = require("../controllers/questionController");
const router = express.Router();

router.get("/", getAllQuestions); // Get all questions
router.post("/", addQuestion);   // Add a new question

module.exports = router;
