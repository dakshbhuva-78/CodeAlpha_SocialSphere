import PostImage from "./PostImage";
import PostInfo from "./PostInfo";

const PostViewer = ({ post }) => {

    return (

        <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,.18)] border border-gray-200 dark:border-gray-700">

            <div className="grid lg:grid-cols-[45%_55%] h-[88vh]">

                <PostImage images={post.images} />

                <PostInfo post={post} />

            </div>

        </div>

    );

};

export default PostViewer;