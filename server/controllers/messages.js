import Message from '../models/message.js';
import { getReceiverSocketId } from '../utils/socket.js';
import { io } from '../utils/socket.js';
import User from '../models/users.js';
import cloudinary from '../utils/cloudinary.js';

const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password ');
        res.status(200).json(
            filteredUsers
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error " + error.message
        });
    }
}

const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId },
                { receiverId: loggedInUserId }
            ]
        });
        const chatPartnersIds = [...new Set(messages.map(msg =>
            msg.senderId.toString() === loggedInUserId.toString() ? msg.receiverId.toString() : msg.senderId.toString()
        )
        )
        ];
        const chatPartners = await User.find({ _id: { $in: chatPartnersIds } }).select('-password ');
        res.status(200).json(
            chatPartners
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error " + error.message
        });
    }
}

const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params;
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        });
        res.status(200).json( messages);
    } catch (error) {
        res.status(500).json( "Internal Server error " + error.message);
    }
}

const sendMessage = async (req, res) => {
    try {
      const { text } = req.body;
      const senderId = req.user._id;
      const { id: receiverId } = req.params;
  
      if (!text && !req.file) {
        return res.status(400).json({
          message: "Text Message or image is required",
        });
      }
  
      if (senderId.toString() === receiverId.toString()) {
        return res.status(400).json({
          message: "You cannot send message to yourself",
        });
      }
  
      let imageUrl = "";
  
      if (req.file) {
        imageUrl = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "chatapp/images" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          );
          stream.end(req.file.buffer);
        });
      }
  
      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl || undefined,
      });
  
      await newMessage.save();

      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage.toObject());
      }
  
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({
        message: "Internal Server error " + error.message,
      });
    }
  };
  


export { getAllContacts, getChatPartners, getMessagesByUserId, sendMessage };