import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const getFeed = () => API.get("/post/feed");
export const toggleLike = (postId) =>
    API.put(`/post/${postId}/like`);

export const toggleSave = (postId) =>
    API.put(`/post/${postId}/save`);

// Get comments
export const getComments = (postId) =>
    API.get(`/post/${postId}/comments`);

// Add comment
export const addComment = (postId, data) =>
    API.post(`/post/${postId}/comment`, data);

// Delete comment
export const deleteComment = (commentId) =>
    API.delete(`/post/comment/${commentId}`);

// Create Post
export const createPost = (formData) =>
    API.post("/post/create",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

// Delete Post
export const deletePost = (postId) =>
    API.delete(`/post/${postId}`);

// Update Post
export const updatePost = (postId, data) =>
    API.put(`/post/${postId}`, data);

// Get User Posts
export const getUserPosts = (userId) =>
    API.get(`/post/user/${userId}`);

// Get Single Post
export const getSinglePost = (postId) =>
    API.get(`/post/${postId}`);

// Get Saved Posts
export const getSavedPosts = () =>
    API.get("/post/saved");

