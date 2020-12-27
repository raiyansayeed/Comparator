import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { GetStaticProps } from "next";
import SearchTag from "./SearchTag";
import { 
    addTag,
    selectQueries
} from '../redux/reducers/querySlice'
import { 
    updateHits
} from '../redux/reducers/hitsSlice'
import { selectLanguages } from "../redux/reducers/languageSlice";

function SearchArea(props) {
    const [query, setQuery] = useState("");
    // const [queryResults, setQueryResults] = useState([]);

    const queries = useSelector(selectQueries);
    const languages = useSelector(selectLanguages);
    const dispatch = useDispatch();

    useEffect(() => {

    })

    function handleSubmit(e) {
        e.preventDefault();
        // const tmp = props.queries.concat([query]);
        // props.onQueryChange(tmp);
        dispatch(addTag(query));
        dispatch(updateHits([queries.concat(query), languages]))
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
                {queries.map((t) => 
                    <SearchTag text={t}/>
                )}
            </div>
        </div>
    );
}

export default SearchArea;
