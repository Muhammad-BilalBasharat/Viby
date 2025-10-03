import User from "../models/users.js";
import bcrypt from "bcryptjs";
import generateTokensAndSetKookie from "../utils/generateTokenAndSetKookie.js";
import {
    sendVerificationEmail,
    welcomeEmail,
} from "../nodemailer/emails.js"
import cloudinary from "../utils/cloudinary.js";

const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = Date.now() + 3600000; // 1 hour from now

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            otp,
            otpExpiry
        });

        await newUser.save();
        generateTokensAndSetKookie(res, newUser._id);

        try {
            await sendVerificationEmail(newUser.email, otp);
        } catch (emailError) {
            // console.error('Failed to send verification email:', emailError);
        }

        // Success response
        res.status(201).json({
            message: "User created successfully. Please check your email for verification code.",
            user: {
                ...newUser._doc,
                password: undefined,
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server error " + error.message,
        });
    }
}

const verifyOtp = async (req, res) => {
    const { otp } = req.body;
    try {
        if (!otp) {
            return res.status(400).json({ message: "OTP is required" })
        }
        const user = await User.findOne({ otp: String(otp), otpExpiry: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired OTP" })
        }
        user.otp = undefined;
        user.otpExpiry = undefined;
        user.isVerified = true;
        await user.save();
        res.status(200).json({
            message: "OTP verified successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server error " + error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email, !password) {
            return res.status(400).json({ message: "All failds are required" })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        if (!user.isVerified) {
            return res.status(400).json({ message: "User is not verified" })
        }

        generateTokensAndSetKookie(res, user._id);
        await welcomeEmail(user.email, user.fullName);

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                ...user._doc,
                password: undefined,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server error " + error.message });
    }
}

const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
}

const updateProfile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: 'Profile picture is required. Please upload an image file.'
            });
        }

        const userId = req.user._id;

        // Convert file buffer to base64 for Cloudinary
        const profilePicture = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        // Upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(profilePicture, {
            folder: 'profile_pictures',
            
            crop: 'fill',
            quality: 'auto:good'
        });
        // Update user profile
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true, select: '-password' }
        );

        res.status(200).json({
            message: 'Profile updated successfully',
            user: updatedUser
        });
    } catch (error) {
        if (error.message && error.message.includes('Invalid image file')) {
            return res.status(400).json({
                message: 'Invalid image file. Please upload a valid image.'
            });
        }

        res.status(500).json({
            message: 'Internal server error: ' + error.message
        });
    }
};

const checkProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.status(200).json(user);
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteProfile = async (req,res) => {
    try {
        const userId=req.user._id;
        const user= await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({
              success: false,
              message: "user not found",
            })
          }
          res.status(200).json({
            success: true,
            message: "user deleted successfully",
          })
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' + error.message});
    }
};







export { signup, login, verifyOtp, logout, updateProfile, checkProfile,deleteProfile };
