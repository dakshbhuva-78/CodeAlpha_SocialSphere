import { useState } from "react";

import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

const SearchPage = () => {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(false);

    return (

        <div className="max-w-4xl mx-auto py-8 px-5">

            <SearchBar
                setUsers={setUsers}
                setLoading={setLoading}
            />

            <SearchResults
                users={users}
                loading={loading}
            />

        </div>

    );

};

export default SearchPage;