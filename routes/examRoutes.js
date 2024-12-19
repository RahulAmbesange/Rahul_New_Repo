const express = require('express');
const router = express.Router();
const Question = require('../models/examModel'); // Your Question model

// Endpoint to fetch all questions and MCQs (GET method)
router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find(); // Fetch all questions from the database
    res.status(200).json({ success: true, questions });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch questions' });
  }
});

// Endpoint to add new questions (POST method)
router.post('/questionspost', async (req, res) => {
  const { questionText, options, correctAnswer } = req.body; // Get the data from the request body

  // Basic validation
  if (!questionText || !options || options.length < 2 || !correctAnswer) {
    return res.status(400).json({ success: false, message: 'Invalid data provided' });
  }

  try {
    // Create a new question and save it to the database
    const newQuestion = new Question({
      questionText,
      options,
      correctAnswer,
    });

    await newQuestion.save(); // Save the new question to the database

    // Send response back
    res.status(201).json({ success: true, message: 'Question added successfully', question: newQuestion });
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ success: false, message: 'Failed to add question' });
  }
});

module.exports = router;
