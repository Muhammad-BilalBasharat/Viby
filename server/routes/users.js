import express from "express";
import { signup ,login,verifyOtp,logout,updateProfile,checkProfile,deleteProfile} from "../controllers/users.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import upload from "../middlewares/upload.js";
import { arcjetProtection } from "../middlewares/arcjet.middleware.js";
const router=express.Router();

// router.use(arcjetProtection); // Apply Arcjet protection middleware
router.post("/signup",signup);
router.post("/login",login);
router.post("/verify-otp",verifyOtp);
router.post("/logout",logout);
router.get('/check-profile', verifyToken, checkProfile);
router.put('/update-profile', verifyToken, upload.single('profilePic'), updateProfile);
router.delete("/delete-profile",verifyToken,deleteProfile);


export default router;