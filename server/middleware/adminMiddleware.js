const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const adminProtect = async (req, res, next) => {
    try {

        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded.role !== "admin") {
                return res.status(403).json({
                    success: false,
                    message: "Admin access required."
                });
            }

            const admin = await Admin.findById(decoded.id).select("-password");

            if (!admin) {
                return res.status(401).json({
                    success: false,
                    message: "Admin not found."
                });
            }

            req.admin = admin;

            next();

        } else {

            return res.status(401).json({
                success: false,
                message: "Not authorized."
            });

        }

    } catch (error) {

        console.error(error);

        res.status(401).json({
            success: false,
            message: "Invalid token."
        });

    }
};

module.exports = adminProtect;