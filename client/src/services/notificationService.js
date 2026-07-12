import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

});

export const getNotifications = () =>
    API.get("/notification");

export const markAsRead = (id) =>
    API.put(`/notification/${id}/read`);

export const markAllAsRead = () =>
    API.put("/notification/read-all");

export const deleteNotification = (id) =>
    API.delete(`/notification/${id}`);