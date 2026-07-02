const multer = require("multer");
const path = require("path");
const fs = require("fs");

const createUploader = (folderName, filePrefix) => {

    const storage = multer.diskStorage({

        destination: (req, file, cb) => {

            const uploadPath = path.join(
                __dirname,
                "..",
                "uploads",
                folderName
            );

            // Create folder automatically if missing
            fs.mkdirSync(uploadPath, {
                recursive: true
            });

            cb(null, uploadPath);

        },

        filename: (req, file, cb) => {

            const uniqueName =
                `${filePrefix}-${Date.now()}${path.extname(file.originalname)}`;

            cb(null, uniqueName);

        }

    });

    const fileFilter = (req, file, cb) => {

        const allowedTypes = /jpg|jpeg|png|webp/;

        const isValid =
            allowedTypes.test(path.extname(file.originalname).toLowerCase()) &&
            allowedTypes.test(file.mimetype);

        if (isValid) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed."));
        }

    };

    return multer({
        storage,
        fileFilter
    });

};

module.exports = createUploader;