// examController.js
const Question = require('../models/examModel'); // Make sure Question model exists

// Get questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find(); // Assuming you are fetching from MongoDB
    res.status(200).json({ success: true, questions });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch questions' });
  }
};
