const Post = require("../models/Post");
const User = require("../models/User");
const Notification = require("../models/Notification");
const Comment = require("../models/Comment");

const createPost = async (req, res) => {
    try {
        const { caption } = req.body;

        // Check Images
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please upload at least one image.",
            });
        }

        // Store Image Paths
        const imagePaths = req.files.map(file => file.path);

        // Create Post
        const post = await Post.create({
            author: req.user.id,

            caption,

            images: imagePaths,
        });

        res.status(201).json({
            success: true,

            message: "Post created successfully.",

            post,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,

            message: "Server Error",
        });
    }
};

const getFeed = async (req, res) => {
    try {

        const user = await User.findById(req.user.id);

        let posts = [];

        // User follows someone
        if (user.following.length > 0) {

            posts = await Post.find({
                author: {
                    $in: [...user.following, user._id]
                }
            })
                .populate("author", "fullName username profilePic")
                .sort({ createdAt: -1 });

        }

        // User follows nobody -> show all posts
        else {

            posts = await Post.find()
                .populate("author", "fullName username profilePic")
                .sort({ createdAt: -1 });

        }

        const postsWithSaveStatus = posts.map(post => ({
            ...post.toObject(),
            isSaved: user.savedPosts.some(
                id => id.toString() === post._id.toString()
            )
        }));

        res.status(200).json({
            success: true,
            count: postsWithSaveStatus.length,
            posts: postsWithSaveStatus
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

const getUserPosts = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        const posts = await Post.find({
            author: req.params.userId
        })
            .populate("author", "fullName username profilePic")
            .sort({ createdAt: -1 });

        const postsWithSaveStatus = posts.map(post => ({
            ...post.toObject(),
            isSaved: user.savedPosts.some(
                id => id.toString() === post._id.toString()
            )
        }));

        res.status(200).json({
            success: true,
            count: posts.length,
            posts: postsWithSaveStatus
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const getSinglePost = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id)
            .populate(
                "author",
                "fullName username profilePic coverPic"
            )
            .populate({
                path: "comments",
                populate: {
                    path: "user",
                    select: "fullName username profilePic"
                },
                options: {
                    sort: {
                        createdAt: -1
                    }
                }
            });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found."
            });
        }

        // NEW
        const user = await User.findById(req.user.id);

        const isSaved = user.savedPosts.some(
            id => id.toString() === post._id.toString()
        );

        res.status(200).json({
            success: true,
            post: {
                ...post.toObject(),
                isSaved
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found.",
            });
        }

        // Only owner can delete
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized.",
            });
        }

        // Delete all comments of this post
        await Comment.deleteMany({
            post: post._id,
        });

        // Delete post
        await post.deleteOne();

        res.status(200).json({
            success: true,
            message: "Post deleted successfully.",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const toggleLike = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found.",
            });
        }

        const userId = req.user.id;

        const alreadyLiked = post.likes.some((id) => id.toString() === userId);

        if (alreadyLiked) {
            post.likes = post.likes.filter((id) => id.toString() !== userId);
        } else {
            post.likes.push(userId);
            // Create notification
            if (post.author.toString() !== req.user.id) {
                await Notification.create({
                    sender: req.user.id,
                    receiver: post.author,
                    post: post._id,
                    type: "like"
                });
            }
        }

        await post.save();

        res.status(200).json({
            success: true,
            liked: !alreadyLiked,
            likesCount: post.likes.length,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const addComment = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                success: false,
                message: "Comment cannot be empty.",
            });
        }

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found.",
            });
        }

        const comment = await Comment.create({
            post: post._id,
            user: req.user.id,
            text,
        });

        post.comments.push(comment._id);

        await post.save();

        // Create notification
        if (post.author.toString() !== req.user.id) {
            await Notification.create({
                sender: req.user.id,
                receiver: post.author,
                post: post._id,
                type: "comment"
            });
        }

        await comment.populate("user", "fullName username profilePic");

        res.status(201).json({
            success: true,
            message: "Comment added successfully.",
            comment,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({
            post: req.params.id,
        })
            .populate("user", "fullName username profilePic")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: comments.length,
            comments,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found.",
            });
        }

        // Get the post
        const post = await Post.findById(comment.post);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found.",
            });
        }

        // Check permissions
        const isCommentOwner =
            comment.user.toString() === req.user.id;

        const isPostOwner =
            post.author.toString() === req.user.id;

        if (!isCommentOwner && !isPostOwner) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to delete this comment.",
            });
        }

        // Remove comment id from Post
        await Post.findByIdAndUpdate(comment.post, {
            $pull: {
                comments: comment._id,
            },
        });

        // Delete comment
        await Comment.findByIdAndDelete(comment._id);

        res.status(200).json({
            success: true,
            message: "Comment deleted successfully.",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const updatePost = async (req, res) => {
    try {
        const { caption } = req.body;

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found.",
            });
        }

        // Only owner can edit
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized.",
            });
        }

        // Update caption
        post.caption = caption || post.caption;

        await post.save();

        res.status(200).json({
            success: true,
            message: "Post updated successfully.",
            post,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const toggleSavePost = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found."
            });
        }

        const user = await User.findById(req.user.id);

        const alreadySaved = user.savedPosts.includes(post._id);

        if (alreadySaved) {

            user.savedPosts = user.savedPosts.filter(
                id => id.toString() !== post._id.toString()
            );

        } else {

            user.savedPosts.push(post._id);

        }

        await user.save();

        res.status(200).json({
            success: true,
            saved: !alreadySaved,
            message: alreadySaved
                ? "Post removed from saved."
                : "Post saved successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

const getSavedPosts = async (req, res) => {
    try {

        const user = await User.findById(req.user.id)
            .populate({
                path: "savedPosts",
                populate: {
                    path: "author",
                    select: "fullName username profilePic"
                }
            });

        res.status(200).json({
            success: true,
            count: user.savedPosts.length,
            posts: [...user.savedPosts].reverse()
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

module.exports = {
    createPost,
    getFeed,
    getUserPosts,
    getSinglePost,
    deletePost,
    toggleLike,
    addComment,
    getComments,
    deleteComment,
    updatePost,
    toggleSavePost,
    getSavedPosts
};
