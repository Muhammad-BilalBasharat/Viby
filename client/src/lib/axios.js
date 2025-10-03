import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.API_URL || "https://viby-chat-epdt.onrender.com/api",
    withCredentials: true,
});

