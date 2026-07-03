const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const createUploader = require("../middleware/uploadMiddleware");

const { createPost, getFeed, getUserPosts, getSinglePost, deletePost, toggleLike, addComment, getComments, deleteComment, updatePost, toggleSavePost, getSavedPosts } = require("../controllers/postController");

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

// Get Saved Posts
router.get("/saved", protect, getSavedPosts);

// Get User Posts
router.get("/user/:userId", protect, getUserPosts);

// Get Single Post
router.get("/:id", protect, getSinglePost);

// Delete Post
router.delete("/:id", protect, deletePost);

// Toggle Like
router.put("/:id/like", protect, toggleLike);

// Toggle Save Post
router.put("/:id/save", protect, toggleSavePost);

// Add Comment
router.post("/:id/comment", protect, addComment);

// Get Comments
router.get("/:id/comments", protect, getComments);

// Delete Comment
router.delete("/comment/:commentId", protect, deleteComment);

// Update Post
router.put("/:id", protect, updatePost);


module.exports = router;