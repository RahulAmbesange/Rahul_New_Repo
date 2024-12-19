const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); // Your Mongoose model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Debug log to see incoming data

    const { firstName, lastName, email, password, mobileNumber } = req.body;

    // Validation to ensure all fields are present
    if (!firstName || !lastName || !email || !password || !mobileNumber) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Save user to database
    const newUser = new User({ firstName, lastName, email, password, mobileNumber });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});


router.post('/login', async (req, res) => {
   const { email, password } = req.body;
 
   if (!email || !password) {
     return res.status(400).json({ success: false, message: 'Email and password are required' });
   }
 
   try {
     const user = await User.findOne({ email });
     if (!user) {
       return res.status(401).json({ success: false, message: 'Invalid credentials' });
     }
 
     const isPasswordValid = await bcrypt.compare(password, user.password);
     if (!isPasswordValid) {
       return res.status(401).json({ success: false, message: 'Invalid credentials' });
     }
 
     const token = jwt.sign(
       { userId: user._id, email: user.email },
       process.env.JWT_SECRET,  // Use the secret from .env
       { expiresIn: '1h' }
     );
 
     res.status(200).json({
       success: true,
       message: 'Login successful',
       token,
     });
   } catch (error) {
     console.error('Error:', error);
     res.status(500).json({ success: false, message: 'Something went wrong' });
   }
 });


 

module.exports = router;
