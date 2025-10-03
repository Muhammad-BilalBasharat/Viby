import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const API_URL =
  import.meta.env.MODE === "development" ? "https://viby-hgor.onrender.com/api" : "/api";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  socket: null,
  onlineUsers: [],

  // ✅ check auth profile
  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check-profile", {
        withCredentials: true,
      });
      set({ authUser: response.data, isCheckingAuth: false });
      get().connectSocket();
      return response.data;
    } catch (error) {
      set({ authUser: null, isCheckingAuth: false });
      return null;
    }
  },

  // ✅ signup
  signup: async (fullName, email, password) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post(
        "/auth/signup",
        { fullName, email, password },
        { withCredentials: true }
      );
      set({ authUser: response.data, isSigningUp: false });
      toast.success("Signup successful!");
      get().connectSocket();
      return { success: true, data: response.data };
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      set({ isSigningUp: false });
      return {
        success: false,
        message: error.response?.data?.message || "Signup failed",
      };
    }
  },

  otpverification: async (email, otp) => {
    try {
      const response = await axiosInstance.post("/auth/verify-otp", {
        email,
        otp,
      });

      // ✅ only set authUser if user object exists
      if (response.data?.user) {
        set({ authUser: response.data.user });
      }

      toast.success("OTP verification successful!");
      return { success: true, data: response.data };
    } catch (error) {
      const msg =
        error.response?.data?.message || "OTP verification failed. Try again.";
      toast.error(msg);

      return { success: false, message: msg };
    }
  },

  // ✅ login
  login: async (email, password) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );

      set({ authUser: response.data.user, isLoggingIn: false });
      toast.success("Login successful!");
      get().connectSocket;
      return { success: true, data: response.data.user };
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      set({ isLoggingIn: false });
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  },

  // ✅ logout
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
      set({ authUser: null });
      toast.success("Logout successful!");
      get().disconnectSocket();
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      return {
        success: false,
        message: error.response?.data?.message || "Logout failed",
      };
    }
  },

  updateProfile: async (profilePicFile) => {
    try {
      const formData = new FormData();
      formData.append("profilePic", profilePicFile);
      const response = await axiosInstance.put(
        "/auth/update-profile",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      set({ authUser: response.data.user });
      toast.success(response.data.message || "Profile updated successfully!");
      return { success: true, data: response.data.user };
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to update profile";
      toast.error(msg);
      return { success: false, message: msg };
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(API_URL, {
      withCredentials: true,
      transports: ["websocket"],
    });

    set({ socket });

    socket.on("connect", () => {});

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    socket.on("disconnect", () => {});
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
