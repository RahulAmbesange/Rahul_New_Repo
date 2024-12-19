// authController.js
const bcrypt = require('bcryptjs');
const User = require('../models/userModel'); // Make sure User model exists

// Register user
exports.registerUser = async (req, res) => {
   const { firstName, lastName, email, password, mobileNumber } = req.body;
 
   if (!mobileNumber) {
     return res.status(400).json({ success: false, message: 'Mobile number is required' });
   }
 
   try {
     const existingUser = await User.findOne({ email });
     if (existingUser) {
       return res.status(400).json({ success: false, message: 'User already exists' });
     }
 
     const hashedPassword = await bcrypt.hash(password, 10);
     const newUser = new User({
       firstName,
       lastName,
       email,
       password: hashedPassword,
       mobileNumber,
     });
 
     await newUser.save();
     res.status(201).json({ success: true, message: 'User registered successfully' });
   } catch (error) {
     console.error('Error during registration:', error);
     res.status(500).json({ success: false, message: 'Something went wrong, please try again' });
   }
 };

// Login user (example)
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};
