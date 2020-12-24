import { useEffect, useState } from "react";
import SearchTag from "./search_tag";

function SearchArea(props) {
    const [query, setQuery] = useState("");
    const [queryList, setQueryList] = useState([]);

    useEffect(() => {

    })

    function handleSubmit(e) {
        e.preventDefault();
        const tmp = queryList.concat([query]);
        setQueryList(tmp);
        console.log("hi");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    onChange={(e) => setQuery(e.target.value)}
                />

                <input type="submit" value="Submit" />
            </form>
            <div>
                {queryList.map((q) => 
                    <SearchTag text={q} />
                )}
            </div>
        </div>
    );
}

export default SearchArea;
