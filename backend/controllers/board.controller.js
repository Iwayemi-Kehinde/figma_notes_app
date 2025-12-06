const Board = require("../models/board.model");

// GET all boards for logged-in user    
exports.getMyBoards = async (req, res, next) => {
  try {
    const boards = await Board.find({
      $or: [
        { createdBy: req.userId },
        { "collaborators.user": req.userId }
      ]
    }).sort({ updatedAt: -1 });

    res.json({ boards });
  } catch (err) {
    next(err);
  }
};

// CREATE board
exports.createBoard = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ message: "All field are required" });

    const board = await Board.create({
      title,
      description,
      createdBy: req.userId
    });

    res.status(201).json({ board });
  } catch (err) {
    next(err);
  }
};

// GET single board
exports.getBoardById = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).json({ message: "Board not found" });

    // permissions:
    if (String(board.createdBy) !== req.userId &&
        !board.collaborators.some(c => String(c.user) === req.userId)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json({ board });
  } catch (err) {
    next(err);
  }
};

// UPDATE board
exports.updateBoard = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).json({ message: "Board not found" });

    if (String(board.createdBy) !== req.userId)
      return res.status(403).json({ message: "Not authorized" });

    board.title = req.body.title ?? board.title;
    board.description = req.body.description ?? board.description;
    board.lastEdited = Date.now();
    await board.save();

    res.json({ board });
  } catch (err) {
    next(err);
  }
};

// DELETE board
exports.deleteBoard = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).json({ message: "Board not found" });

    if (String(board.createdBy) !== req.userId)
      return res.status(403).json({ message: "Not authorized" });

    await board.deleteOne();
    res.json({ message: "Board deleted" });
  } catch (err) {
    next(err);
  }
};
