import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    fullName: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String },
    otpExpiry: { type: Date},
    profilePic: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
},{timestamps:true});

export default mongoose.model("User",userSchema);
