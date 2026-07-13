import { useEffect, useState } from "react";
import { X, MessageCircle, Trash2 } from "lucide-react";

import {
    getComments,
    addComment,
    deleteComment,
} from "../../services/postService";

import { getImageUrl } from "../../utils/getImageUrl";

const currentUser = JSON.parse(
    localStorage.getItem("user")
);

const CommentModal = ({ post, close, setCommentCount }) => {

    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchComments = async () => {

        try {

            const res = await getComments(post._id);

            setComments(res.data.comments);

            setCommentCount(res.data.comments.length);


        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchComments();

    }, []);

    const handleComment = async () => {

        if (!text.trim()) return;

        try {

            await addComment(post._id, {
                text
            });

            setText("");

            fetchComments();

        } catch (err) {

            console.log(err);

        }

    };

    const handleDelete = async (commentId) => {

        try {

            await deleteComment(commentId);

            fetchComments();

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-8">

            <div className="w-[900px] h-[620px] bg-white dark:bg-gray-900 rounded-3xl overflow-hidden flex shadow-2xl border border-gray-700 animate-[scaleIn_.25s_ease]">
                {/* LEFT */}

                <div className="w-[55%] bg-black flex items-center justify-center">

                    <img
                        src={getImageUrl(post.images[0])}
                        className="h-full w-full object-cover rounded-l-3xl"
                    />

                </div>

                {/* RIGHT */}

                <div className="w-[45%] flex flex-col">

                    {/* HEADER */}

                    <div className="flex items-center justify-between px-5 py-4 border-b dark:border-gray-700">

                        <div className="flex items-center gap-3">

                            <img
                                src={getImageUrl(post.author.profilePic)}
                                className="w-10 h-10 rounded-full object-cover border"
                            />

                            <div>

                                <h3 className="font-semibold">
                                    {post.author.fullName}
                                </h3>

                                <p className="text-xs text-gray-500">
                                    @{post.author.username}
                                </p>

                            </div>

                        </div>

                        <button
                            onClick={close}
                            className="w-9 h-9 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center"
                        >
                            <X size={20} />
                        </button>

                    </div>

                    {/* CAPTION */}

                    <div className="px-5 py-4 border-b dark:border-gray-700">

                        <p className="text-sm leading-6">

                            {post.caption}

                        </p>

                    </div>

                    {/* COMMENTS */}

                    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

                        {

                            loading ?

                                <div className="flex justify-center py-20">

                                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />

                                </div>

                                :

                                comments.length === 0 ?

                                    <div className="h-full flex flex-col items-center justify-center">

                                        <MessageCircle
                                            size={70}
                                            className="text-gray-400"
                                        />

                                        <h3 className="text-xl font-bold mt-4">

                                            No Comments Yet

                                        </h3>

                                        <p className="text-gray-500 mt-2">

                                            Start the conversation.

                                        </p>

                                    </div>

                                    :

                                    comments.map((comment) => (

                                        <div className="flex gap-3 items-start" key={comment._id}>

                                            <img
                                                src={getImageUrl(comment.user.profilePic)}
                                                className="w-9 h-9 rounded-full object-cover"
                                            />

                                            <div className="flex-1">

                                                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3">

                                                    <h4 className="font-semibold text-sm">

                                                        {comment.user.fullName}

                                                    </h4>

                                                    <p className="text-sm mt-1">

                                                        {comment.text}

                                                    </p>
                                                    {
                                                        (
                                                            comment.user._id === currentUser._id ||
                                                            post.author._id === currentUser._id
                                                        ) && (

                                                            <button
                                                                onClick={() => handleDelete(comment._id)}
                                                                className="mt-2 flex items-center gap-1 text-red-500 hover:text-red-600 text-xs"
                                                            >
                                                                <Trash2 size={14} />
                                                                Delete
                                                            </button>

                                                        )
                                                    }

                                                </div>

                                            </div>

                                        </div>

                                    ))

                        }

                    </div>

                    {/* FOOTER */}

                    <div className="border-t dark:border-gray-700 p-4">

                        <div className="flex items-center gap-3">

                            <input
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Add a comment..."
                                className="flex-1 rounded-full bg-gray-100 dark:bg-gray-800 px-5 py-3 outline-none"
                            />

                            <button
                                onClick={handleComment}
                                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-white font-semibold"
                            >
                                Post
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default CommentModal;