const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key'; // Use the same secret key

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from header

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify the token
    req.user = decoded; // Attach the decoded payload to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
