const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const createUploader = (folderName, filePrefix) => {

    const storage = new CloudinaryStorage({

        cloudinary,

        params: {

            folder: `SocialSphere/${folderName}`,

            allowed_formats: ["jpg", "jpeg", "png", "webp"],

            public_id: (req, file) =>
                `${filePrefix}-${Date.now()}`

        }

    });

    return multer({

        storage,

        fileFilter: (req, file, cb) => {

            const allowed = [
                "image/jpeg",
                "image/png",
                "image/jpg",
                "image/webp"
            ];

            if (allowed.includes(file.mimetype)) {

                cb(null, true);

            } else {

                cb(new Error("Only image files are allowed"));

            }

        }

    });

};

module.exports = createUploader;