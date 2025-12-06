const User = require('../models/user.model');
const { signAccessToken, signRefreshToken, hashPassword, comparePassword } = require('../utils/auth.utils');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'email and password required' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const passwordHash = await hashPassword(password);
    const user = new User({ name, email, passwordHash });
    await user.save();

    const accessToken = signAccessToken({ sub: user._id });
    const refreshToken = signRefreshToken({ sub: user._id });

    user.refreshTokens.push({ token: refreshToken, createdAt: new Date() });
    await user.save();

    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'lax' });
    res.status(201).json({ user: { id: user._id, email: user.email, name: user.name }, accessToken });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'email and password required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Incorrect credentials' });

    const ok = await comparePassword(password, user.passwordHash);
    if (!ok) return res.status(400).json({ message: 'Incorrect credentials' });

    const accessToken = signAccessToken({ sub: user._id });
    const refreshToken = signRefreshToken({ sub: user._id });

    user.refreshTokens.push({ token: refreshToken, createdAt: new Date() });
    await user.save();

    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'lax' });
    res.json({ accessToken, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) { next(err); }
};

exports.refresh = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken || req.body.refreshToken;
    if (!token) return res.status(401).json({ message: 'No refresh token' });

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (e) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ message: 'User not found' });

    const found = user.refreshTokens.find(r => r.token === token);
    if (!found) {
      // possible token reuse attack.. clear all refresh tokens for safety
      user.refreshTokens = [];
      await user.save();
      return res.status(401).json({ message: 'Refresh token not recognized' });
    }

    // rotate: remove old, add new
    user.refreshTokens = user.refreshTokens.filter(r => r.token !== token);
    const newRefreshToken = signRefreshToken({ sub: user._id });
    user.refreshTokens.push({ token: newRefreshToken, createdAt: new Date() });
    await user.save();

    const accessToken = signAccessToken({ sub: user._id });
    res.cookie('refreshToken', newRefreshToken, { httpOnly: true, sameSite: 'lax' });
    res.json({ accessToken });
  } catch (err) { next(err); }
};

exports.logout = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken || req.body.refreshToken;
    if (token) {
      // remove token from DB
      await User.updateOne({}, { $pull: { refreshTokens: { token } }});
    }
    res.clearCookie('refreshToken');
    res.json({ ok: true });
  } catch (err) { next(err); }
};

exports.me = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('-passwordHash -refreshTokens');
    res.json({ user });
  } catch (err) { next(err); }
};
