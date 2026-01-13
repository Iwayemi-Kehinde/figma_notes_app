const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, index: true, required: true },
  passwordHash: { type: String },
  avatarUrl: { type: String },
  role: { type: String, enum: ['user','admin'], default: 'user' },
  emailVerified: {type: Boolean, default: false},
  verifyToken: {type:String, default:null},
  verifyTokenExpire: {type: Date, default: null},
  refreshTokens: [{ token: String, createdAt: Date }] // store tokens for rotation/revocation
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);