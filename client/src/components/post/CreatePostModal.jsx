import {
    X,
    ImagePlus,
    ChevronLeft,
    ChevronRight,
    Trash2,
    Plus,
    Image as ImageIcon,
} from "lucide-react";
import { useRef, useState, useContext } from "react";

import { createPost } from "../../services/postService";

import { toast } from "react-hot-toast";

import { AuthContext } from "../../context/AuthContext";

import { getImageUrl } from "../../utils/getImageUrl";


const CreatePostModal = ({ close }) => {

    const fileInputRef = useRef(null);
    const thumbnailRef = useRef(null);

    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [caption, setCaption] = useState("");
    const [loading, setLoading] = useState(false);

    const { user: currentUser } = useContext(AuthContext);

    /* ------------------------------
            IMAGE SELECT
    ------------------------------ */

    const handleImageSelect = (e) => {

        const files = Array.from(e.target.files);

        if (!files.length) return;

        const previews = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        if (images.length === 0) {

            setImages(previews);
            setCurrentImage(0);

        } else {

            setImages((prev) => [...prev, ...previews]);

        }

        e.target.value = "";
    };

    // DELETE IMAGE

    const deleteImage = () => {

        const updated = [...images];

        updated.splice(currentImage, 1);

        setImages(updated);

        if (updated.length === 0) {

            setCurrentImage(0);
            return;

        }

        if (currentImage >= updated.length) {

            setCurrentImage(updated.length - 1);

        }

    };

    // Handle Share Post
    const handleShare = async () => {

        if (images.length === 0) {
            return toast.error("Please select at least one image.");
        }

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("caption", caption);

            images.forEach((image) => {
                formData.append("images", image.file);
            });

            const res = await createPost(formData);

            toast.success(res.data.message);

            close();

            window.location.reload();

        } catch (err) {

            console.log(err);

            toast.error(
                err.response?.data?.message || "Failed to create post."
            );

        } finally {

            setLoading(false);

        }

    };

    // NEXT IMAGE
    const nextImage = () => {

        if (currentImage < images.length - 1) {

            setCurrentImage((prev) => prev + 1);

        }

    };

    // PREVIOUS IMAGE
    const prevImage = () => {

        if (currentImage > 0) {

            setCurrentImage((prev) => prev - 1);

        }

    };

    // SCROLL THUMBNAILS
    const scrollLeft = () => {

        thumbnailRef.current?.scrollBy({
            left: -250,
            behavior: "smooth",
        });

    };

    const scrollRight = () => {

        thumbnailRef.current?.scrollBy({
            left: 250,
            behavior: "smooth",
        });

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-6">

            <div className="w-[1050px] h-[700px] bg-white dark:bg-[#111827] rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,.45)] overflow-hidden flex flex-col">

                {/* ================= HEADER ================= */}

                <div className="h-16 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">

                    <button
                        onClick={close}
                        className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition"
                    >
                        <X size={24} />
                    </button>

                    <h2 className="text-xl font-bold">

                        Create New Post

                    </h2>

                    <button
                        disabled={images.length === 0}
                        onClick={handleShare}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition px-6 py-2 rounded-full text-white font-semibold"
                    >

                        Share

                    </button>

                </div>

                {/* ================= BODY ================= */}

                <div className="flex flex-1 overflow-hidden">

                    {/* LEFT */}

                    <div className="w-[60%] bg-black relative flex items-center justify-center">

                        {/* Upload Screen */}

                        {images.length === 0 ? (

                            <div className="flex flex-col items-center">

                                <div className="w-28 h-28 rounded-full bg-blue-600/15 flex items-center justify-center">

                                    <ImagePlus
                                        size={70}
                                        className="text-blue-500"
                                    />

                                </div>

                                <h2 className="text-white text-4xl font-bold mt-8">

                                    Upload Your Photos

                                </h2>

                                <p className="text-gray-400 mt-3 text-lg">

                                    Choose one or multiple images

                                </p>

                                <button

                                    onClick={() => fileInputRef.current.click()}

                                    className="mt-10 bg-blue-600 hover:bg-blue-700 transition px-10 py-4 rounded-full text-white font-semibold"

                                >

                                    Select From Computer

                                </button>

                            </div>

                        ) : (

                            <>

                                {/* Main Image */}

                                <img
                                    src={images[currentImage].preview}
                                    alt=""
                                    className="max-w-full max-h-full object-contain"
                                />

                                {/* Delete Button */}

                                <button
                                    onClick={deleteImage}
                                    className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white shadow-xl transition"
                                >
                                    <Trash2 size={18} />
                                </button>

                                {/* Previous */}

                                {currentImage > 0 && (

                                    <button
                                        onClick={prevImage}
                                        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md flex items-center justify-center text-white transition"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>

                                )}

                                {/* Next */}

                                {currentImage < images.length - 1 && (

                                    <button
                                        onClick={nextImage}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md flex items-center justify-center text-white transition"
                                    >
                                        <ChevronRight size={24} />
                                    </button>

                                )}

                                {/* Bottom Toolbar */}

                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent px-6 pt-6 pb-5">

                                    <div className="flex justify-between items-center mb-4">

                                        <span className="text-white text-sm">

                                            {currentImage + 1} / {images.length}

                                        </span>

                                        <button
                                            onClick={() => fileInputRef.current.click()}
                                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full text-sm text-white font-semibold flex items-center gap-2"
                                        >
                                            <Plus size={18} />
                                            Add Photos
                                        </button>

                                    </div>

                                    <div className="flex items-center gap-3">

                                        {images.length > 5 && (

                                            <button
                                                onClick={prevImage}
                                                disabled={currentImage === 0}
                                                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex justify-center items-center disabled:opacity-30"
                                            >
                                                <ChevronLeft size={18} />
                                            </button>

                                        )}

                                        {/* Thumbnails */}

                                        <div className=" flex-1 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide px-2 ">
                                            <div className="flex gap-3">

                                                {images.map((image, index) => (

                                                    <button
                                                        key={index}
                                                        onClick={() => setCurrentImage(index)}
                                                        className={` flex-shrink-0 w-18 h-18 rounded-xl overflow-hidden border-2 transition-all ${currentImage === index
                                                            ? "border-blue-500"
                                                            : "border-transparent hover:border-gray-400"
                                                            }
                                                        `}>
                                                        <img
                                                            src={image.preview}
                                                            alt=""
                                                            className="w-full h-full object-contain bg-gray-900"
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {images.length > 5 && (

                                            <button
                                                onClick={nextImage}
                                                disabled={currentImage === images.length - 1}
                                                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex justify-center items-center disabled:opacity-30"
                                            >
                                                <ChevronRight size={18} />
                                            </button>

                                        )}

                                    </div>

                                </div>

                            </>

                        )}

                        <input hidden ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleImageSelect} />

                    </div>

                    {/* ================= RIGHT PANEL ================= */}

                    <div className="w-[40%] flex flex-col bg-white dark:bg-[#111827]">

                        {/* User Header */}

                        <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-200 dark:border-gray-800">

                            <img
                                src={getImageUrl(currentUser.profilePic)}
                                alt=""
                                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500"
                            />

                            <div>

                                <h3 className="font-semibold text-[16px]">

                                    {currentUser.fullName}

                                </h3>

                                <p className="text-sm text-gray-500">

                                    @{currentUser.username}

                                </p>

                            </div>

                        </div>

                        {/* Caption */}

                        <div className="flex-1 flex flex-col px-6 py-5">

                            <label className="text-sm font-semibold text-gray-500 mb-3">

                                Caption

                            </label>

                            <textarea value={caption} onChange={(e) => setCaption(e.target.value)} maxLength={2200} placeholder="Share what's on your mind..." className=" flex-1 resize-none rounded-2xl bg-gray-100 dark:bg-gray-800 p-5 outline-none text-[15px] leading-7 placeholder:text-gray-400 " />
                            <div className="flex justify-end mt-3">

                                <span className="text-xs text-gray-500">
                                    {caption.length} / 2200
                                </span>

                            </div>

                        </div>

                        {/* Divider */}

                        <div className="border-t border-gray-200 dark:border-gray-800" />

                        {/* Extra Options */}

                        <div className="px-6 py-5 space-y-3">

                            <button className="w-full flex justify-between items-center p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition">

                                <div className="flex items-center gap-3">
                                    📍
                                    <span>
                                        Add Location
                                    </span>
                                </div>

                                <span>
                                    →
                                </span>
                            </button>

                            <button className="w-full flex justify-between items-center p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                                <div className="flex items-center gap-3">
                                    👥
                                    <span>
                                        Tag People
                                    </span>
                                </div>

                                <span>
                                    →
                                </span>
                            </button>

                            <button className="w-full flex justify-between items-center p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition">

                                <div className="flex items-center gap-3">
                                    😊
                                    <span>
                                        Accessibility
                                    </span>
                                </div>
                                <span>
                                    →
                                </span>
                            </button>

                        </div>

                        {/* Bottom */}

                        <div className="border-t border-gray-200 dark:border-gray-800 p-6">

                            <button
                                onClick={handleShare}
                                disabled={images.length === 0 || loading}
                                className=" w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-semibold transition">

                                {loading ? "Sharing..." : "Share Post"}
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default CreatePostModal;