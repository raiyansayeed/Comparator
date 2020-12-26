import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import SearchTag from "./search_tag";


function SearchArea(props) {
    const [query, setQuery] = useState("");
    const [queryResults, setQueryResults] = useState([]);

    useEffect(() => {

    })

    function handleSubmit(e) {
        e.preventDefault();
        const tmp = props.queries.concat([query]);
        props.onQueryChange(tmp);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="e.g Rust"
                    onChange={(e) => setQuery(e.target.value)}
                />

                <input type="submit" value="Submit" />
            </form>
            <div>
                {props.queries.map((q) => 
                    <SearchTag text={q} />
                )}
            </div>
        </div>
    );
}

export default SearchArea;
