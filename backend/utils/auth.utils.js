const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signAccessToken = (payload) => jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES || '15m' });
const signRefreshToken = (payload) => jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES || '30d' });

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
const comparePassword = (password, hash) => bcrypt.compare(password, hash);

module.exports = { signAccessToken, signRefreshToken, hashPassword, comparePassword };
