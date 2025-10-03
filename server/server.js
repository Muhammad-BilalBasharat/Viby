import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB.js";
import userRoutes from "./routes/users.js";
import messagesRoutes from "./routes/messages.js";
import { server, app } from "./utils/socket.js";
dotenv.config();



app.get('/', (req, res) => {
  res.send('Hello World!')
})





// const app = express();
app.use(express.json({limit: "50mb"}));
app.use(cookieParser());


app.use(cors({
  origin: ["https://viby-1-t7xs.onrender.com", "http://localhost:5173"],
  credentials: true,
}));



const PORT = process.env.PORT || 5000;


app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoutes);

server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
  connectDB();
});
