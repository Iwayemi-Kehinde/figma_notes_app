const express = require("express")
const {
    createNote,
    updateNote,
    deleteNote,
    getNotesByBoard
} = "../controllers/note.controller";
const { requireAuth } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post("/", requireAuth, createNote);
router.patch("/:id", requireAuth, updateNote);
router.delete("/:id", requireAuth, deleteNote);
router.get("/board/:boardId", requireAuth, getNotesByBoard);

export default router;
