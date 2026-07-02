const sanitizeUser = (user) => ({
    _id: user._id,
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    bio: user.bio,
    profilePic: user.profilePic,
    coverPic: user.coverPic,
    followers: user.followers,
    following: user.following,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
});

module.exports = sanitizeUser;