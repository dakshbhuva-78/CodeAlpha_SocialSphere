import { useEffect, useState, useContext } from "react";
import {
    Heart,
    Bookmark,
    MessageCircle,
    Trash2,
} from "lucide-react";

import {
    toggleLike,
    toggleSave,
    getComments,
    addComment,
    deleteComment,
} from "../../services/postService";

import { AuthContext } from "../../context/AuthContext";
import timeAgo from "../../utils/timeAgo";
import { getImageUrl } from "../../utils/getImageUrl";

const PostInfo = ({ post }) => {

    const { user } = useContext(AuthContext);

    const [likes, setLikes] = useState(post.likes);

    const [liked, setLiked] = useState(
        post.likes.some(id => id.toString() === user._id)
    );

    const [saved, setSaved] = useState(post.isSaved || false);

    const [comments, setComments] = useState([]);

    const [text, setText] = useState("");

    const fetchComments = async () => {

        try {

            const res = await getComments(post._id);

            setComments(res.data.comments);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        fetchComments();

    }, []);

    const handleLike = async () => {

        try {

            const res = await toggleLike(post._id);

            if (res.data.liked) {

                setLiked(true);

                setLikes(prev => [...prev, user._id]);

            } else {

                setLiked(false);

                setLikes(prev =>
                    prev.filter(id => id.toString() !== user._id)
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

    const handleComment = async () => {

        if (!text.trim()) return;

        try {

            await addComment(post._id, { text });

            setText("");

            fetchComments();

        } catch (err) {

            console.log(err);

        }

    };

    const handleDeleteComment = async (id) => {

        try {

            await deleteComment(id);

            fetchComments();

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="flex flex-col h-full overflow-hidden">

            {/* Header */}

            <div className="flex items-center gap-3 p-5 border-b shrink-0">

                <img
                    src={getImageUrl(post.author.profilePic)}
                    className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex-1">

                    <h3 className="font-semibold text-lg">
                        {post.author.fullName}
                    </h3>

                    <p className="text-sm text-gray-500">
                        @{post.author.username}
                    </p>

                </div>

            </div>

            {/* Caption */}

            <div className="px-5 py-4 border-b shrink-0">

                <p className="leading-7">

                    {post.caption}

                </p>

                <p className="text-xs text-gray-400 mt-3">

                    {timeAgo(post.createdAt)}

                </p>

            </div>

            {/* Comments */}

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

                {

                    comments.map(comment => (

                        <div
                            key={comment._id}
                            className="flex gap-3"
                        >

                            <img
                                src={getImageUrl(comment.user.profilePic)}
                                className="w-9 h-9 rounded-full object-cover"
                                alt=""
                            />

                            <div className="flex-1">

                                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3">

                                    <p className="font-semibold text-sm">

                                        {comment.user.fullName}

                                    </p>

                                    <p className="text-sm mt-1 leading-6">

                                        {comment.text}

                                    </p>

                                </div>

                                {

                                    (
                                        comment.user._id === user._id ||
                                        post.author._id === user._id
                                    ) && (

                                        <button
                                            onClick={() => handleDeleteComment(comment._id)}
                                            className="text-red-500 text-xs mt-2 flex items-center gap-1 hover:underline"
                                        >

                                            <Trash2 size={13} />

                                            Delete

                                        </button>

                                    )

                                }

                            </div>

                        </div>

                    ))

                }

            </div>

            {/* Footer */}

            <div className="border-t shrink-0">

                <div className="flex justify-between items-center px-5 py-4">

                    <div className="flex gap-5">

                        <Heart
                            size={28}
                            onClick={handleLike}
                            fill={liked ? "red" : "none"}
                            color={liked ? "red" : "currentColor"}
                            className="cursor-pointer hover:scale-110 transition"
                        />

                        <MessageCircle
                            size={28}
                        />

                    </div>

                    <Bookmark
                        size={28}
                        onClick={handleSave}
                        fill={saved ? "currentColor" : "none"}
                        className="cursor-pointer hover:scale-110 transition"
                    />

                </div>

                <div className="px-5 pb-3 font-semibold">

                    {likes.length} Likes

                </div>

                <div className="border-t p-4">

                    <div className="flex gap-3">

                        <input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Write a comment..."
                            className="flex-1 rounded-full border px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            onClick={handleComment}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-7 font-semibold transition"
                        >
                            Post
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default PostInfo;