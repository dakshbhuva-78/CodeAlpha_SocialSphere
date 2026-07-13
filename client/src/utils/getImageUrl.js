import { BASE_URL } from "../config/config";

export const getImageUrl = (image) => {
    if (!image) return BASE_URL + "/uploads/profiles/default-avatar.jpg";

    return image.startsWith("http")
        ? image
        : BASE_URL + image;
};