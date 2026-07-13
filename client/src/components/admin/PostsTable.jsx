import { useState } from "react";
import { Trash2 } from "lucide-react";

import { deletePost } from "../../services/adminService";
import DeletePostModal from "./DeletePostModal";

import { getImageUrl } from "../../utils/getImageUrl";

const PostsTable = ({ posts, setPosts }) => {

    const [selectedPost, setSelectedPost] = useState(null);

    const handleDelete = async () => {

        try {

            await deletePost(selectedPost._id);

            setPosts(prev =>
                prev.filter(post => post._id !== selectedPost._id)
            );

            setSelectedPost(null);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100 dark:bg-gray-700">

                        <tr>

                            <th className="p-4">Image</th>

                            <th className="p-4 text-left">Caption</th>

                            <th className="p-4 text-left">Author</th>

                            <th className="p-4">Likes</th>

                            <th className="p-4">Comments</th>

                            <th className="p-4">Delete</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            posts.map(post => (

                                <tr
                                    key={post._id}
                                    className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >

                                    <td className="p-3">

                                        <img
                                            src={getImageUrl(post.images[0])}
                                            className="w-20 h-20 rounded-lg object-cover"
                                            alt=""
                                        />

                                    </td>

                                    <td className="max-w-xs p-3">

                                        <p className="truncate">

                                            {post.caption || "No Caption"}

                                        </p>

                                    </td>

                                    <td className="p-3">

                                        {post.author.fullName}

                                    </td>

                                    <td className="text-center">

                                        {post.likes.length}

                                    </td>

                                    <td className="text-center">

                                        {post.comments.length}

                                    </td>

                                    <td className="text-center">

                                        <button
                                            onClick={() => setSelectedPost(post)}
                                            className="text-red-600 hover:text-red-700"
                                        >

                                            <Trash2 size={20} />

                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

            {

                selectedPost && (

                    <DeletePostModal

                        close={() => setSelectedPost(null)}

                        onDelete={handleDelete}

                    />

                )

            }

        </>

    );

};

export default PostsTable;