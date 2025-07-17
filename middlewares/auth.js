import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authenticateToken = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers['authorization']; // Format: Bearer TOKEN
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    const secret = process.env.JWT_SECRET;
    const user = jwt.verify(token, secret); // Validate token
    req.user = user; // Add user info to request
    next(); // Continue to route
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

export default authenticateToken;
