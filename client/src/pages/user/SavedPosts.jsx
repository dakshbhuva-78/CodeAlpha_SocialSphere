import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark } from "lucide-react";

import MainLayout from "../../layouts/MainLayout";
import { getSavedPosts } from "../../services/postService";

const BASE_URL = "http://localhost:5000";

const SavedPosts = () => {

    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadPosts();

    }, []);

    const loadPosts = async () => {

        try {

            const res = await getSavedPosts();

            setPosts(res.data.posts);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    return (

        <MainLayout>

            <div className="max-w-6xl mx-auto py-10 px-6">

                {/* Header */}

                <div className="flex items-center gap-3 mb-8">

                    <Bookmark
                        size={30}
                        className="text-blue-600"
                    />

                    <div>

                        <h1 className="text-3xl font-bold">

                            Saved Posts

                        </h1>

                        <p className="text-gray-500">

                            Posts you've saved for later.

                        </p>

                    </div>

                </div>

                {
                    loading ?

                        <div className="text-center py-32">

                            Loading...

                        </div>

                        :

                        posts.length === 0 ?

                            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow p-20 text-center">

                                <Bookmark
                                    size={70}
                                    className="mx-auto text-gray-400"
                                />

                                <h2 className="text-2xl font-bold mt-6">

                                    No Saved Posts

                                </h2>

                                <p className="text-gray-500 mt-3">

                                    Posts you save will appear here.

                                </p>

                            </div>

                            :

                            <div className="grid grid-cols-3 gap-5">

                                {
                                    posts.map(post => (

                                        <div
                                            key={post._id}
                                            onClick={() =>
                                                navigate(`/post/${post._id}`)
                                            }
                                            className="relative cursor-pointer rounded-2xl overflow-hidden group bg-black aspect-square"
                                        >

                                            <img
                                                src={BASE_URL + post.images[0]}
                                                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                            />

                                            <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-white">

                                                <div className="text-lg font-bold">

                                                    ❤️ {post.likes.length}

                                                </div>

                                                <div className="mt-2">

                                                    💬 {post.comments.length}

                                                </div>

                                            </div>

                                        </div>

                                    ))
                                }

                            </div>

                }

            </div>

        </MainLayout>

    );

};

export default SavedPosts;