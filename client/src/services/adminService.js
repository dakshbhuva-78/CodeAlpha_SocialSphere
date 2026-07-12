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
    API.post("/login", data);

// Dashboard
export const getDashboard = () =>
    API.get("/dashboard");

// Users
export const getUsers = () =>
    API.get("/users");

export const deleteUser = (id) =>
    API.delete(`/users/${id}`);

// Posts
export const getPosts = () =>
    API.get("/posts");

export const deletePost = (id) =>
    API.delete(`/posts/${id}`);