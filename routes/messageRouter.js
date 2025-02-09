import express from "express";
import { recieveMessageController, sendMessageController } from "../controllers/messageController.js";

const router = express.Router();

// Send a message (store in DB)
router.post("/send", sendMessageController);

// Retrieve messages between two users
router.get("/:senderId/:receiverId", recieveMessageController);

export default router;
