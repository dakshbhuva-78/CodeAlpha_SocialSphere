import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");

    if (adminToken) {
        config.headers.Authorization = `Bearer ${adminToken}`;
    } else if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default API;