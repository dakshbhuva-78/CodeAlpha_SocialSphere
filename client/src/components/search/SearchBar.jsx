import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { searchUsers } from "../../services/userService";

const SearchBar = ({ setUsers, setLoading }) => {

    const [query, setQuery] = useState("");

    useEffect(() => {

        const timer = setTimeout(async () => {

            if (!query.trim()) {

                setUsers([]);

                return;

            }

            try {

                setLoading(true);

                const res = await searchUsers(query);

                setUsers(res.data.users);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);

            }

        }, 500);

        return () => clearTimeout(timer);

    }, [query]);

    return (

        <div className="mb-8">

            <div className="relative">

                <Search
                    size={20}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search users..."
                    className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white dark:bg-gray-800 shadow outline-none border border-transparent focus:border-blue-500 transition"
                />

            </div>

        </div>

    );

};

export default SearchBar;