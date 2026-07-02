const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const createUploader = require("../middleware/uploadMiddleware");

const { createPost, getFeed, getUserPosts, toggleLike, addComment, getComments, deleteComment } = require("../controllers/postController");

// Upload images inside uploads/posts/
const postUpload = createUploader("posts", "post");

// Create Post
router.post(
    "/create",
    protect,
    postUpload.array("images", 10),
    createPost
);

// Get Feed
router.get("/feed", protect, getFeed);

// Get User Posts
router.get("/user/:userId", protect, getUserPosts);

// Toggle Like
router.put("/:id/like", protect, toggleLike);

// Add Comment
router.post("/:id/comment", protect, addComment);

// Get Comments
router.get("/:id/comments", protect, getComments);

// Delete Comment
router.delete("/comment/:commentId", protect, deleteComment);

module.exports = router;