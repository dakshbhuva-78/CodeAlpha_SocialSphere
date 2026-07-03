const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification
} = require("../controllers/notificationController");

// Get Notifications
router.get("/", protect, getNotifications);

// Mark Single Notification Read
router.put("/:id/read", protect, markAsRead);

// Mark All Notifications Read
router.put("/read-all", protect, markAllAsRead);

// Delete Notification
router.delete("/:id", protect, deleteNotification);

module.exports = router;