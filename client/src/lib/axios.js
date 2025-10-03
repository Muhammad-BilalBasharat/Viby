import axios from "axios";

const API_BASE =
  import.meta.env.MODE === "production"
    ? "https://viby-chat-epdt.onrender.com/api" // Render backend
    : "http://localhost:5000/api";              // Local dev

export const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // important for cookies / auth
});
