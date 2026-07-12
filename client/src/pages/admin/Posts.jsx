import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import PostsTable from "../../components/admin/PostsTable";

import { getPosts } from "../../services/adminService";

const Posts = () => {

    const [posts, setPosts] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadPosts = async () => {

            try {

                const res = await getPosts();

                setPosts(res.data.posts);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);

            }

        };

        loadPosts();

    }, []);

    return (

        <AdminLayout>

            <h1 className="text-3xl font-bold mb-8">

                Posts Management

            </h1>

            {

                loading ?

                    <p>Loading...</p>

                    :

                    <PostsTable
                        posts={posts}
                        setPosts={setPosts}
                    />

            }

        </AdminLayout>

    );

};

export default Posts;