import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {

    const token = localStorage.getItem("adminToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

});

// Admin Login
export const loginAdmin = (data) =>
    API.post("/admin/login", data);

// Dashboard
export const getDashboard = () =>
    API.get("/admin/dashboard");

// Users
export const getUsers = () =>
    API.get("/admin/users");

export const deleteUser = (id) =>
    API.delete(`/admin/users/${id}`);

// Posts
export const getPosts = () =>
    API.get("/admin/posts");

export const deletePost = (id) =>
    API.delete(`/admin/posts/${id}`);