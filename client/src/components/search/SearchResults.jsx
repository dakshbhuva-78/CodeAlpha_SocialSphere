import SearchUserCard from "./SearchUserCard";

const SearchResults = ({ users, loading }) => {

    if (loading) {

        return (

            <div className="text-center py-20">

                Loading...

            </div>

        );

    }

    if (users.length === 0) {

        return (

            <div className="text-center text-gray-500 py-20">

                Start searching for users.

            </div>

        );

    }

    return (

        <div className="space-y-5">

            {
                users.map((user) => (

                    <SearchUserCard
                        key={user._id}
                        user={user}
                    />

                ))
            }

        </div>

    );

};

export default SearchResults;