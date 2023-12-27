const jwt = require('jsonwebtoken');
const { Admin } = require('../db');
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  try {
    let token = req.headers.authorization;
    if (!token || !token?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Invalid JWT token' });
    }
    const SECRET = process.env.SECRET;
    token = token.replace('Bearer ', '');
    const payload = jwt.verify(token, SECRET);
    console.log('payload', payload);
    const username = payload?.username;
    const user = await Admin.findOne({ username });

    if (!user) return res.status(401).json({ message: 'Invalid JWT token' });

    next();
  } catch (error) {
    console.log('ERROR', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'JsonWebTokenError' });
    }
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token has expired' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = adminMiddleware;
