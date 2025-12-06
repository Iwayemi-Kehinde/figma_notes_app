const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth.middleware");
const boardController = require("../controllers/board.controller");
1
router.get("/", requireAuth, boardController.getMyBoards);
router.post("/", requireAuth, boardController.createBoard);
router.get("/:id", requireAuth, boardController.getBoardById);
router.patch("/:id", requireAuth, boardController.updateBoard);
router.delete("/:id", requireAuth, boardController.deleteBoard);

module.exports = router;
