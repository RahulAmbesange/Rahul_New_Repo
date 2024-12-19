const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String], // Array of options (e.g., ["Option 1", "Option 2", "Option 3", "Option 4"])
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true, // Store the correct option, e.g., "Option 1"
  },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
