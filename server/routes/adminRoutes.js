const express = require("express");

const router = express.Router();

const adminProtect = require("../middleware/adminMiddleware");
const { loginAdmin, getDashboard, getAllUsers, deleteUser, getAllPosts, deletePost } = require("../controllers/adminController");

// Admin Login
router.post("/login", loginAdmin);
    
// Admin Dashboard
router.get("/dashboard", adminProtect, getDashboard);

// Get All Users
router.get("/users", adminProtect, getAllUsers);

// Delete User
router.delete("/users/:id", adminProtect, deleteUser);

// Get All Posts
router.get("/posts", adminProtect, getAllPosts);

// Delete Post
router.delete("/posts/:id", adminProtect, deletePost);

module.exports = router;