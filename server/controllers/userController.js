const User = require("../models/User");
const Post = require("../models/Post");
const Notification = require("../models/Notification");
const sanitizeUser = require("../utils/sanitizeUser");


const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found."
            });

        }

        res.status(200).json({
            success: true,
            user: sanitizeUser(user)
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

const uploadProfilePicture = async (req, res) => {
    console.log("Upload API Hit");

    try {
        console.log(req.file);

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please select an image."
            });
        }

        const imagePath = `/uploads/profiles/${req.file.filename}`;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                profilePic: imagePath
            },
            {
                new: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Profile picture updated successfully.",
            user: sanitizeUser(user)
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

const uploadCoverPicture = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please select an image."
            });
        }

        const imagePath = `/uploads/covers/${req.file.filename}`;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                coverPic: imagePath
            },
            {
                new: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Cover picture updated successfully.",
            user: sanitizeUser(user)
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

const updateProfile = async (req, res) => {
    try {

        const { fullName, username, bio } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Check username availability
        const normalizedUsername = username?.trim().toLowerCase();

        if (normalizedUsername && normalizedUsername !== user.username) {

            const existingUser = await User.findOne({
                username: normalizedUsername
            });

            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "Username already exists."
                });
            }

            user.username = normalizedUsername;
        }

        if (fullName) {
            user.fullName = fullName;
        }

        if (bio !== undefined) {
            user.bio = bio;
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user: sanitizeUser(user)
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

const toggleFollow = async (req, res) => {
    try {

        const currentUser = await User.findById(req.user.id);

        const targetUser = await User.findById(req.params.id);

        if (!targetUser) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Cannot follow yourself
        if (currentUser._id.toString() === targetUser._id.toString()) {
            return res.status(400).json({
                success: false,
                message: "You cannot follow yourself."
            });
        }

        const alreadyFollowing =
            currentUser.following.includes(targetUser._id);

        if (alreadyFollowing) {

            // Unfollow
            currentUser.following.pull(targetUser._id);

            targetUser.followers.pull(currentUser._id);

            await currentUser.save();
            await targetUser.save();

            return res.status(200).json({
                success: true,
                following: false,
                message: "User unfollowed successfully."
            });

        }

        // Follow
        currentUser.following.push(targetUser._id);

        targetUser.followers.push(currentUser._id);

        await currentUser.save();

        await targetUser.save();

        // Create notification
        await Notification.create({
            sender: req.user.id,
            receiver: targetUser._id,
            type: "follow"
        });

        res.status(200).json({
            success: true,
            following: true,
            message: "User followed successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

const getUserProfile = async (req, res) => {
    try {

        const profileUser = await User.findById(req.params.id);

        if (!profileUser) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        const loggedInUser = await User.findById(req.user.id);

        const postsCount = await Post.countDocuments({
            author: profileUser._id
        });

        const posts = await Post.find({
            author: profileUser._id
        });

        // Total likes received on all posts
        const likesCount = posts.reduce(
            (total, post) => total + post.likes.length,
            0
        );

        const isFollowing = loggedInUser.following.includes(profileUser._id);

        res.status(200).json({
            success: true,
            user: {
                _id: profileUser._id,
                fullName: profileUser.fullName,
                username: profileUser.username,
                bio: profileUser.bio,
                profilePic: profileUser.profilePic,
                coverPic: profileUser.coverPic,
                followersCount: profileUser.followers.length,
                followingCount: profileUser.following.length,
                postsCount,
                likesCount,
                isFollowing
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

const searchUsers = async (req, res) => {
    try {

        const query = req.query.query;

        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required."
            });
        }

        const users = await User.find({

            $or: [

                {
                    fullName: {
                        $regex: query,
                        $options: "i"
                    }
                },

                {
                    username: {
                        $regex: query,
                        $options: "i"
                    }
                }

            ]

        }).select(
            "fullName username profilePic bio"
        );

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

const getFollowers = async (req, res) => {
    try {

        const user = await User.findById(req.params.id)
            .populate(
                "followers",
                "fullName username profilePic"
            );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        res.status(200).json({
            success: true,
            users: user.followers
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

const getFollowing = async (req, res) => {
    try {

        const user = await User.findById(req.params.id)
            .populate(
                "following",
                "fullName username profilePic"
            );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        res.status(200).json({
            success: true,
            users: user.following
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

const getSuggestedUsers = async (req, res) => {
    try {

        const currentUser = await User.findById(req.user.id);

        const excludeUsers = [
            currentUser._id,
            ...currentUser.following
        ];

        const users = await User.find({
            _id: {
                $nin: excludeUsers
            }
        })
            .select("fullName username profilePic")
            .limit(5);

        res.status(200).json({
            success: true,
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


module.exports = {
    getProfile,
    uploadProfilePicture,
    uploadCoverPicture,
    updateProfile,
    toggleFollow,
    getUserProfile,
    searchUsers,
    getFollowers,
    getFollowing,
    getSuggestedUsers
};