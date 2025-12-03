const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.requireAuth = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: 'No token' });
    const token = auth.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.userId = payload.sub;
    req.user = await User.findById(req.userId).select('-passwordHash -refreshTokens');
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
