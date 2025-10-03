import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import userRoutes from "./routes/users.js";
import messagesRoutes from "./routes/messages.js";
import { CLIENT_URL } from "./config/envConfig.js";
import { server, app } from "./utils/socket.js";
import path from "path";
dotenv.config();
const __dirname = path.resolve();



app.get('/', (req, res) => {
  res.send('Hello World!')
})





// const app = express();
app.use(express.json({limit: "50mb"}));
app.use(cookieParser());
app.use(cors(
  {
    origin: CLIENT_URL || "https://viby-1-t7xs.onrender.com",
    credentials: true,
  }));
app.use(helmet());

const PORT = process.env.PORT || 5000;


app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoutes);

server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
  connectDB();
});
