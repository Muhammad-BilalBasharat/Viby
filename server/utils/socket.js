import { Server } from "socket.io";
import http from "http";
import express from "express";
import { socketAuthMiddleware } from "../middlewares/socketAuth.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://viby-1-t7xs.onrender.com/", // no trailing slash
    credentials: true,
    methods: ["GET", "POST"],
  },
});

io.use(socketAuthMiddleware);

const userSocketMap = {};

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  const { userId } = socket;
  userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };
