import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getSinglePost } from "../../services/postService";
import MainLayout from "../../layouts/MainLayout";
import PostViewer from "../../components/post/PostViewer";


const PostDetails = () => {

    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadPost = async () => {

            try {

                const res = await getSinglePost(id);

                setPost(res.data.post);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);

            }

        };

        loadPost();

    }, [id]);

    return (

        <MainLayout>

            <div className="max-w-[1550px] mx-auto py-10 px-6">

                {

                    loading ?

                        <div className="text-center py-32">

                            Loading Post...

                        </div>

                        :

                        !post ?

                            <div className="text-center py-32">

                                Post Not Found

                            </div>

                            :

                            <PostViewer post={post} />

                }

            </div>

        </MainLayout>

    );

};

export default PostDetails;