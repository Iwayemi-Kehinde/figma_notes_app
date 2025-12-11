const Note = require("../models/note.model")

// Create a new note on a board
export const createNote = async (req, res) => {
  try {
    const { boardId } = req.body;
    const userId = req.user._id; // from auth middleware

    const note = await Note.create({
      boardId,
      createdBy: userId
    });

    return res.status(201).json({
      success: true,
      note
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Update note fields (text, position, size, color)
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const note = await Note.findByIdAndUpdate(id, updates, { new: true });

    return res.json({
      success: true,
      note
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete note
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    await Note.findByIdAndDelete(id);

    return res.json({ success: true, message: "Note deleted" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Get all notes for a board
export const getNotesByBoard = async (req, res) => {
  try {
    const { boardId } = req.params;

    const notes = await Note.find({ boardId });

    return res.json({ success: true, notes });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
