require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("./models/Admin");

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

const createAdmin = async () => {

    try {

        const existing = await Admin.findOne({
            email: "admin@gmail.com",
        });

        if (existing) {

            console.log("Admin already exists.");

            process.exit();

        }

        const hashedPassword = await bcrypt.hash("admin123", 10);

        await Admin.create({
            fullName: "Super Admin",
            email: "admin@gmail.com",
            password: hashedPassword,
        });

        console.log("✅ Admin Created Successfully");

        process.exit();

    } catch (error) {

        console.log(error);

        process.exit();

    }

};

createAdmin();