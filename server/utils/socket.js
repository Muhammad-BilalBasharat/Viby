import { Server } from "socket.io";
import http from "http";
import express from "express";
import { socketAuthMiddleware } from "../middlewares/socketAuth.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin:"https://viby-1-t7xs.onrender.com/",
        credentials: true,
        methods: ["GET", "POST"],
    },
});
// 
io.use(socketAuthMiddleware);

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}


const userSocketMap = {};
io.on("connection", (socket) => {
    // console.log(`User connected: ${socket.user.fullName}`);
    // console.log(socket.userId, "socket.userId");
// 
    const { userId } = socket;
    userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        // console.log(`User disconnected: ${socket.user.fullName}`);
        // console.log(socket.userId, "socket.userId");
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, server, app };
