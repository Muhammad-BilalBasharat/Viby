import mongoose from "mongoose"
import { MONGO_URI } from "./envConfig.js"

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("MongoDB connected")
    } catch (error) {
        console.error("MongoDB connection error:", error)
    }
}

export default connectDB;

