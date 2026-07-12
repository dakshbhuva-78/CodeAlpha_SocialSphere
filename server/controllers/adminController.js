const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Notification = require("../models/Notification");

const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials."
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials."
            });
        }

        const token = jwt.sign(
            {
                id: admin._id,
                role: "admin"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            success: true,
            token,
            admin: {
                id: admin._id,
                fullName: admin.fullName,
                email: admin.email
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

const getDashboard = async (req, res) => {
    try {

        const totalUsers = await User.countDocuments();

        const totalPosts = await Post.countDocuments();

        const totalComments = await Comment.countDocuments();

        const totalNotifications = await Notification.countDocuments();

        res.status(200).json({
            success: true,
            dashboard: {
                totalUsers,
                totalPosts,
                totalComments,
                totalNotifications
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

const getAllUsers = async (req, res) => {
    try {

        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: users.length,
            users
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

const deleteUser = async (req, res) => {
    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Delete user's posts
        await Post.deleteMany({
            author: user._id
        });

        // Delete user's comments
        await Comment.deleteMany({
            user: user._id
        });

        // Delete notifications
        await Notification.deleteMany({
            $or: [
                { sender: user._id },
                { receiver: user._id }
            ]
        });

        // Remove user from followers/following
        await User.updateMany(
            {},
            {
                $pull: {
                    followers: user._id,
                    following: user._id,
                }
            }
        );

        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: "User deleted successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

const getAllPosts = async (req, res) => {
    try {

        const posts = await Post.find()
            .populate("author", "fullName username profilePic")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: posts.length,
            posts
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
                message: "Post not found."
            });
        }

        // Delete comments of this post
        await Comment.deleteMany({
            post: post._id
        });

        // Remove post from all users' savedPosts
        await User.updateMany(
            {},
            {
                $pull: {
                    savedPosts: post._id
                }
            }
        );

        // Delete notifications related to this post
        await Notification.deleteMany({
            post: post._id
        });

        // Delete post
        await post.deleteOne();

        res.status(200).json({
            success: true,
            message: "Post deleted successfully."
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
    loginAdmin,
    getDashboard,
    getAllUsers,
    deleteUser,
    getAllPosts,
    deletePost
};