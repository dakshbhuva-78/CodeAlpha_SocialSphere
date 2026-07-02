const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");
const sanitizeUser = require("../utils/sanitizeUser");

const registerUser = async (req, res) => {
    try {

        const { fullName, username, email, password } = req.body;

        if (!fullName || !username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields."
            });
        }

        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already exists."
            });
        }

        const existingUsername = await User.findOne({ username });

        if (existingUsername) {
            return res.status(400).json({
                success: false,
                message: "Username already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            username,
            email,
            password: hashedPassword
        });


        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            token,
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

const loginUser = async (req, res) => {
    try {

        const { login, password } = req.body;

        if (!login || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields."
            });
        }

        const user = await User.findOne({
            $or: [
                { email: login.toLowerCase() },
                { username: login.toLowerCase() }
            ]
        });


        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password."
            });
        }

        const token = generateToken(user._id);


        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
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

module.exports = {
    registerUser,
    loginUser
};