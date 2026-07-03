const Notification = require("../models/Notification");

const getNotifications = async (req, res) => {
    try {

        const notifications = await Notification.find({
            receiver: req.user.id
        })
            .populate("sender", "fullName username profilePic")
            .populate("post", "caption images")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: notifications.length,
            notifications
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

const markAsRead = async (req, res) => {
    try {

        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found."
            });
        }

        notification.isRead = true;

        await notification.save();

        res.status(200).json({
            success: true,
            message: "Notification marked as read."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

const markAllAsRead = async (req, res) => {
    try {

        await Notification.updateMany(
            {
                receiver: req.user.id,
                isRead: false
            },
            {
                isRead: true
            }
        );

        res.status(200).json({
            success: true,
            message: "All notifications marked as read."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

const deleteNotification = async (req, res) => {
    try {

        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found."
            });
        }

        // Only receiver can delete notification
        if (notification.receiver.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized."
            });
        }

        await notification.deleteOne();

        res.status(200).json({
            success: true,
            message: "Notification deleted successfully."
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
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification
};