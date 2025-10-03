import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.API_URL || "https://viby-hgor.onrender.com/api",
    withCredentials: true,
});

