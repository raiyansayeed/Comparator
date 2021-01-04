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
    const [suggestions, setSuggestions] = useState([]);

    const test = ["bruh"];

    const queries = useSelector(selectQueries);
    const languages = useSelector(selectLanguages);
    const dispatch = useDispatch();

    useEffect(() => {});

    function onTextChange(e) {
        const val = e.target.value;
        setQuery(val);
        if (val.length > 0) {
            const regex = new RegExp(`^${val}`, `i`);
            console.log(test.sort().filter(v => regex.test(v)));
            // console.log(val);
            setSuggestions(test.sort().filter(v => regex.test(v)));

          }
    }

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
            <form onSubmit={handleSubmit} autoComplete="off">
                <input
                    type="text"
                    name="name"
                    placeholder="e.g Rust"
                    value={query}
                    onChange={onTextChange}
                />
                <input type="submit" value="Submit" />
                <div className="suggestions">
                    <ul>
                        {suggestions.map(kw => <li key={kw}>{kw}</li>)}
                    </ul>
                </div>
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
