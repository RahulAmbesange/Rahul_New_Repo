// resultController.js
const Result = require('../models/resultModel'); // Make sure Result model exists

// Save result
exports.saveResult = async (req, res) => {
   const { userId, score } = req.body;
 
   try {
     const existingResult = await Result.findOne({ userId });
     if (existingResult) {
       existingResult.score = score;
       await existingResult.save();
     } else {
       const newResult = new Result({ userId, score });
       await newResult.save();
     }
 
     res.status(201).json({ success: true, message: 'Result saved successfully' });
   } catch (error) {
     console.error('Error saving result:', error);
     res.status(500).json({ success: false, message: 'Failed to save result' });
   }
 };

// Get result by user ID
exports.getResult = async (req, res) => {
   const { userId } = req.params;
 
   try {
     const result = await Result.findOne({ userId });
     if (!result) {
       return res.status(404).json({ success: false, message: 'Result not found' });
     }
     res.status(200).json({ success: true, result });
   } catch (error) {
     console.error('Error fetching result:', error);
     res.status(500).json({ success: false, message: 'Failed to fetch result' });
   }
 };
 