import { useEffect, useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import { getUserPosts } from "../../services/postService";
import { useNavigate } from "react-router-dom";

import { getImageUrl } from "../../utils/getImageUrl";

const ProfilePosts = ({ user }) => {


    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadPosts = async () => {

            try {

                const res = await getUserPosts(user._id);

                setPosts(res.data.posts);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);

            }

        };

        loadPosts();

    }, [user._id]);

    if (loading) {

        return (

            <div className="bg-white rounded-2xl shadow mt-6 p-10 text-center">

                Loading Posts...

            </div>

        );

    }

    return (

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow mt-6">

            {/* Tabs */}

            <div className="flex justify-center border-b dark:border-gray-700">

                <button className="px-8 py-5 font-semibold border-b-2 border-blue-600">

                    Posts ({posts.length})

                </button>

            </div>

            {

                posts.length === 0 ?

                    <div className="py-20 text-center text-gray-500">

                        No posts yet.

                    </div>

                    :

                    <div className="grid grid-cols-3 gap-2 p-2">

                        {

                            posts.map((post) => (

                                <div
                                    key={post._id}
                                    onClick={() => navigate(`/post/${post._id}`)}
                                    className="relative group aspect-square rounded-lg overflow-hidden cursor-pointer"
                                >

                                    <img
                                        src={getImageUrl(post.images[0])}
                                        alt=""
                                        className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex justify-center items-center gap-8 text-white">

                                        <div className="flex items-center gap-2">

                                            <Heart
                                                fill="white"
                                                size={22}
                                            />

                                            {post.likes.length}

                                        </div>

                                        <div className="flex items-center gap-2">

                                            <MessageCircle
                                                fill="white"
                                                size={22}
                                            />

                                            {post.comments.length}

                                        </div>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

            }

        </div>

    );

};

export default ProfilePosts;