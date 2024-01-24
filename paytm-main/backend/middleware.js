const jwt = require('jsonwebtoken');
const { User } = require('./db');

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!(authorization && authorization.startsWith('Bearer'))) {
      return res.status(411).json({ message: 'invalid header' });
    }
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ _id: payload.userId });
    if (!user) {
      return res.status(403).json({ message: 'invalid jwt token' });
    }
    req.userId = payload.userId;
    next();
  } catch (error) {
    return res.status(403).json({});
  }
};

module.exports = {
  authMiddleware,
};
