import { Heart, MessageCircle, Bookmark, Share2, ChevronLeft, ChevronRight, MoreHorizontal, Pencil, Trash2, } from "lucide-react";
import { toggleLike, toggleSave, deletePost, updatePost } from "../../services/postService";
import { useState, useContext } from "react";
import timeAgo from "../../utils/timeAgo";
import CommentModal from "./CommentModal";
import { AuthContext } from "../../context/AuthContext";
import DeletePostModal from "./DeletePostModal";
import EditPostModal from "./EditPostModal";

import { getImageUrl } from "../../utils/getImageUrl";

const PostCard = ({ post, setPosts = () => { } }) => {

    const { user: currentUser } = useContext(AuthContext);

    if (!currentUser) return null;

    const isOwner = currentUser._id === post.author._id;

    const [likes, setLikes] = useState(post.likes);

    const [liked, setLiked] = useState(
        post.likes.some(
            (id) => id.toString() === currentUser._id
        )
    );

    const [saved, setSaved] = useState(post.isSaved || false);

    const [commentCount, setCommentCount] = useState(
        post.comments.length
    );
    const [openComments, setOpenComments] = useState(false);

    const [showMenu, setShowMenu] = useState(false);

    const [editing, setEditing] = useState(false);

    const [showDelete, setShowDelete] = useState(false);

    const [caption, setCaption] = useState(post.caption);

    const handleLike = async () => {

        try {

            const res = await toggleLike(post._id);

            if (res.data.liked) {

                setLiked(true);

                setLikes((prev) => [...prev, currentUser._id]);

            } else {

                setLiked(false);

                setLikes((prev) =>
                    prev.filter((id) => id.toString() !== currentUser._id)
                );

            }

        } catch (err) {

            console.log(err);

        }

    };


    const handleSave = async () => {

        try {

            const res = await toggleSave(post._id);

            setSaved(res.data.saved);

        } catch (err) {

            console.log(err);

        }

    };

    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {

        if (currentImage < post.images.length - 1) {
            setCurrentImage(currentImage + 1);
        }

    };
    const prevImage = () => {

        if (currentImage > 0) {
            setCurrentImage(currentImage - 1);
        }

    };


    const handleDelete = async () => {

        try {

            await deletePost(post._id);

            if (setPosts) {

                setPosts(prev =>
                    prev.filter(p => p._id !== post._id)
                );

            }

            setShowDelete(false);

        } catch (err) {

            console.log(err);

        }

    };

    const handleUpdate = async (newCaption) => {

        try {

            const res = await updatePost(
                post._id,
                {
                    caption: newCaption,
                }
            );

            post.caption = res.data.post.caption;

            setCaption(res.data.post.caption);

            setEditing(false);

        } catch (err) {

            console.log(err);

        }

    };


    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">

            {/* Header */}
            <div className="flex justify-between items-start p-4">
                <div className="flex gap-3">
                    <img
                        src={getImageUrl(post.author.profilePic)}
                        alt=""
                        className="w-12 h-12 rounded-full object-cover"
                    />

                    <h3 className="font-semibold">
                        {post.author.fullName}
                    </h3>

                    <div className="text-sm text-gray-500 flex items-center gap-2">

                        <span>
                            @{post.author.username}
                        </span>

                        <span>•</span>

                        <span>
                            {timeAgo(post.createdAt)}
                        </span>

                    </div>
                </div>

                {
                    isOwner && (

                        <div className="relative">

                            <button
                                onClick={() => setShowMenu(!showMenu)}
                            >
                                <MoreHorizontal />
                            </button>

                            {
                                showMenu && (

                                    <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg w-44 z-20">

                                        <button
                                            onClick={() => {
                                                setEditing(true);
                                                setShowMenu(false);
                                            }}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                                        >
                                            <Pencil size={18} />
                                            Edit Post
                                        </button>

                                        <button
                                            onClick={() => {
                                                setShowDelete(true);
                                                setShowMenu(false);
                                            }}
                                            className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 w-full"
                                        >
                                            <Trash2 size={18} />
                                            Delete Post
                                        </button>

                                    </div>

                                )
                            }

                        </div>

                    )
                }

            </div>

            {/* Caption */}
            <div className="px-4 pb-3">

                <p>{caption}</p>

            </div>

            {/* Image */}
            <div className="relative">

                <img
                    src={getImageUrl(post.images[currentImage])}
                    alt=""
                    className="w-full max-h-[650px] object-cover"
                />

                {currentImage > 0 && (
                    <button onClick={prevImage}>
                        <ChevronLeft size={22} />
                    </button>
                )}

                {currentImage < post.images.length - 1 && (
                    <button onClick={nextImage}>
                        <ChevronRight size={22} />
                    </button>
                )}

            </div>
            <div className="flex justify-center gap-2 py-3">

                {post.images.map((_, index) => (

                    <div

                        key={index}

                        className={`w-2 h-2 rounded-full ${currentImage === index
                            ? "bg-blue-500"
                            : "bg-gray-400"
                            }`}

                    />

                ))}

            </div>

            {/* Buttons */}

            <div className="flex justify-between p-4">

                <div className="flex gap-5">

                    <Heart
                        onClick={handleLike}
                        fill={liked ? "red" : "none"}
                        color={liked ? "red" : "currentColor"}
                        className="cursor-pointer transition hover:scale-110"
                    />
                    <MessageCircle
                        onClick={() => setOpenComments(true)}
                        className="cursor-pointer hover:text-blue-500 transition"
                    />
                    <Share2 className="cursor-pointer hover:text-green-500 transition" />

                </div>

                <Bookmark
                    onClick={handleSave}
                    fill={saved ? "currentColor" : "none"}
                    className="cursor-pointer transition hover:scale-110"
                />

            </div>

            {/* Counts */}

            <div className="px-4 pb-4 text-sm text-gray-500">

                ❤️ {likes.length} Likes

                <br />

                💬 {commentCount} Comments

            </div>
            {
                openComments && (
                    <CommentModal
                        post={post}
                        close={() => setOpenComments(false)}
                        setCommentCount={setCommentCount}
                    />
                )
            }
            {
                editing && (

                    <EditPostModal
                        post={post}
                        close={() => setEditing(false)}
                        onSave={handleUpdate}
                    />

                )
            }
            {
                showDelete && (

                    <DeletePostModal
                        close={() => setShowDelete(false)}
                        onDelete={handleDelete}
                    />

                )
            }
        </div>
    );
};

export default PostCard;