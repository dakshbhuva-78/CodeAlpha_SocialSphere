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

export const getMyProfile = () =>
    API.get("/user/me");


export const getUserProfile = (id) =>
    API.get(`/user/${id}`);

export const updateProfile = (data) =>
    API.put("/user/update-profile", data);

export const uploadProfilePicture = (formData) =>
    API.put("/user/profile-picture", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const uploadCoverPicture = (formData) =>
    API.put("/user/cover-picture", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const toggleFollow = (id) =>
    API.put(`/user/follow/${id}`);


export const searchUsers = (query) =>
    API.get(`/user/search?query=${query}`);

export const getFollowers = (id) =>
    API.get(`/user/${id}/followers`);

export const getFollowing = (id) =>
    API.get(`/user/${id}/following`);

export const getSuggestedUsers = () =>
    API.get("/user/suggestions");