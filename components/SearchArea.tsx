import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetStaticProps } from "next";
import SearchTag from "./SearchTag";
import { addTag, selectQueries } from "../redux/reducers/querySlice";
import { updateHits } from "../redux/reducers/hitsSlice";
import { selectLanguages } from "../redux/reducers/languageSlice";

function SearchArea(props) {
    const [query, setQuery] = useState("");
    // const [queryResults, setQueryResults] = useState([]);
    const [error, setError] = useState("");

    const queries = useSelector(selectQueries);
    const languages = useSelector(selectLanguages);
    const dispatch = useDispatch();

    useEffect(() => {});

    function handleSubmit(e) {
        e.preventDefault();

        // add query if it isn't in list already
        if (!queries.includes(query.toLowerCase())) {
            dispatch(addTag(query.toLowerCase()))
            dispatch(updateHits([queries.concat([query.toLowerCase()]), languages]));
            setQuery("")
        } else {
            setError(`Error: ${query} is already in your search list`);
        }

    }

    return (
        <div className="sticky top-0">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="e.g Rust"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <input type="submit" value="Submit" />
            </form>
            <p>{error.toLowerCase()}</p>
            <div>
                {queries.map((t) => (
                    <SearchTag text={t} />
                ))}
            </div>
        </div>
    );
}

export default SearchArea;
