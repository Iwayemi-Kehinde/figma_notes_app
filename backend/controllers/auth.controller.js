const User = require('../models/user.model');
const { signAccessToken, signRefreshToken, hashPassword, comparePassword } = require('../utils/auth.utils');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const { sendVerifyEmail } = require('../utils/email.utils');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'email and password required' });

    const normalizedEmail = email.toLowerCase().trim()

    const exists = await User.findOne({ email });
    if (exists && exists.emailVerified === true) return res.status(400).json({ message: 'User already exists' })

    if (exists && exists.emailVerified === false) {
      const verifyToken = crypto.randomBytes(32).toString("hex");
      const verifyTokenExpire = new Date(Date.now() + 30 * 60 * 1000);

      user.verifyToken = verifyToken
      user.verifyTokenExpire = verifyTokenExpire

      await user.save()

      const verifyLink = `${process.env.APP_URL}/verify-token?token=${verifyToken}&email=${normalizedEmail}`

      await sendVerifyEmail(normalizedEmail, verifyLink);

      return res.status(201).json({ message: "Email verification Link re-sent.. Please check your inbox" });
    }

    //For New Users

    const passwordHash = await hashPassword(password);
    const user = new User({ name, email, passwordHash })

    const verifyToken = crypto.randomBytes(32).toString("hex");
    const verifyTokenExpire = new Date(Date.now() + 30 * 60 * 1000);

    user.verifyToken = verifyToken
    user.verifyTokenExpire = verifyTokenExpire

    await user.save()

    const verifyLink = `${process.env.APP_URL}/verify-token?token=${verifyToken}&email=${normalizedEmail}`

    await sendVerifyEmail(normalizedEmail, verifyLink);

    res.status(201).json({ message: "Email verification Link sent... Please check your inbox" });
  } catch (err) { next(err); }
};


exports.verifyEmail = async (req, res, next) => {
  try {
    const { token, email } = req.body;

    if (!token || !email) {
      return res.status(400).send("Invalid verification link");
    }

    //Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("Not found");
    }
    verifyTokenExpire
    const verified = user.verifyToken === token && user.verifyTokenExpire > Date.now()

    if (verified) {
      user.emailVerified = true;
      user.verifyToken = null
      user.verifyTokenExpire = null
      await user.save();
      return res.status(204).send({ message: "Email verified... you can now login!" });
    } else {
      return res.status(400).send("Invalid or expired token");
    }
  } catch (err) {
    next(err)
  }
}

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
      await User.updateOne({}, { $pull: { refreshTokens: { token } } });
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
