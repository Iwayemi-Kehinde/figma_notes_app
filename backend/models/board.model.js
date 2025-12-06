const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: {type: String, required: true},
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  collaborators: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    role: { type: String, enum: ["editor", "viewer"], default: "editor" }
  }],

  lastEdited: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Board", boardSchema);
