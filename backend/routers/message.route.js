import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
import upload from "../lib/upload.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:receiverId", protectRoute, getMessages);
router.post("/send/:receiverId", protectRoute, upload.single('image'), sendMessage);

export default router;