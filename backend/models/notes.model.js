const mongoose = require("mongoose")

const NoteSchema = new mongoose.Schema({
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true },
    text: { type: String, default: "" },
    x: { type: Number, default: 100 },
    y: { type: Number, default: 100 },
    width: { type: Number, default: 200 },
    height: { type: Number, default: 200 },
    color: { type: String, default: "#fff8a8" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  }, { timestamps: true });
  
module.exports = mongoose.model("Note", NoteSchema)