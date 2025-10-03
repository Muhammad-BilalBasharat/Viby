import express from 'express';
import { getAllContacts, getMessagesByUserId, sendMessage, getChatPartners } from '../controllers/messages.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { arcjetProtection } from '../middlewares/arcjet.middleware.js';
import upload from '../middlewares/upload.js';
const router = express.Router();

router.use(verifyToken); // Apply middlewares to all routes
router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", upload.single("image"), sendMessage);


export default router;