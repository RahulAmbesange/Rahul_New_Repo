const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Ensure bcrypt is installed: npm install bcrypt

// Define the schema for a user
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'] 
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 6 
  },
  mobileNumber: { 
    type: String, 
    required: true, 
    match: [/^\d{10}$/, 'Mobile number must be 10 digits'] 
  },
}, { timestamps: true });

// Pre-save hook to hash the password before saving to the database
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next(); // Only hash if the password field is modified

  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    user.password = await bcrypt.hash(user.password, salt); // Hash the password
    next();
  } catch (error) {
    next(error);
  }
});

// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
