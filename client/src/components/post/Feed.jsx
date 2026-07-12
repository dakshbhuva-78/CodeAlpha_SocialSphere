import { useEffect, useState } from "react";
import { getFeed } from "../../services/postService";
import PostCard from "./PostCard";

const Feed = () => {

    const [posts, setPosts] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadFeed = async () => {

            try {

                const res = await getFeed();

                setPosts(res.data.posts);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);

            }

        };

        loadFeed();

    }, []);

    if (loading) {
        return <p>Loading Feed...</p>;
    }

    return (
        <div className="space-y-6">

            {posts.map((post) => (

                <PostCard
                    key={post._id}
                    post={post}
                    setPosts={setPosts}
                />

            ))}

        </div>
    );
};

export default Feed;