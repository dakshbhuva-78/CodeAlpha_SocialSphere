import { Link } from "react-router-dom";

import { BASE_URL } from "../../config/config";
import { getImageUrl } from "../../utils/getImageUrl";

const SearchUserCard = ({ user }) => {

    return (

        <Link
            to={`/profile/${user._id}`}
            className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow hover:shadow-lg transition"
        >

            <img
                src={getImageUrl(user.profilePic)}
                className="w-16 h-16 rounded-full object-cover"
            />

            <div>

                <h3 className="font-bold text-lg">

                    {user.fullName}

                </h3>

                <p className="text-gray-500">

                    @{user.username}

                </p>

                <p className="text-sm mt-2 text-gray-400">

                    {user.bio}

                </p>

            </div>

        </Link>

    );

};

export default SearchUserCard;