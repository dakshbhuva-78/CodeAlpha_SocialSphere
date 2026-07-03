const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const createUploader = require("../middleware/uploadMiddleware");
const profileUpload = createUploader("profiles", "profile");
const coverUpload = createUploader("covers", "cover");

const { getProfile, uploadProfilePicture, uploadCoverPicture, updateProfile, toggleFollow, getUserProfile, searchUsers } = require("../controllers/userController");

router.get("/me", protect, getProfile);
router.put(
    "/profile-picture",
    protect,
    profileUpload.single("profilePic"),
    uploadProfilePicture
);
router.put(
    "/cover-picture",
    protect,
    coverUpload.single("coverPic"),
    uploadCoverPicture
);
router.put("/update-profile", protect, updateProfile);

router.put("/follow/:id", protect, toggleFollow);

router.get("/search", protect, searchUsers);

router.get("/:id", protect, getUserProfile);


module.exports = router;