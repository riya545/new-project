const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access Denied. Invalid token format.' });
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.SECRET_KEY;

  try {
    const user = jwt.verify(token, secret);
    req.user = user;
    console.log(user)
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = {
  authenticateToken
};
