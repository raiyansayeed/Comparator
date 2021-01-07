import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetStaticProps } from "next";
import SearchTag from "./SearchTag";
import { addTag, selectQueries } from "../redux/reducers/querySlice";
import { updateHits } from "../redux/reducers/hitsSlice";
import { selectLanguages } from "../redux/reducers/languageSlice";
import { selectKwList } from "../redux/reducers/languageSlice";
import { Input, Button, useToast } from "@chakra-ui/react";

function SearchArea(props) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [itemPosition, setItemPosition] = useState(0);

    const queries = useSelector(selectQueries);
    const languages = useSelector(selectLanguages);
    const kw_list = useSelector(selectKwList);
    const dispatch = useDispatch();
    const toast = useToast()

    useEffect(() => {});

    function onTextChange(e) {
        const val = e.target.value;
        setQuery(val);
        // check for empty string and if query exactly matches a suggestion
        if (val.length > 0 && !kw_list.includes(val.toLowerCase())) {
            const regex = new RegExp(`^${val}`, `i`);
            // create shallow copy of array to prevent redux state mutation error
            const tmp = [...kw_list];
            var new_suggestions = tmp.sort().filter((v) => regex.test(v));

            // remove common elements between queries and the new suggestions
            new_suggestions = new_suggestions.filter(
                (val) => !queries.includes(val)
            );

            setSuggestions(new_suggestions);
        } else {
            setSuggestions([]);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        // add query if it isn't in list already
        if (!queries.includes(query.toLowerCase())) {
            dispatch(addTag(query.toLowerCase()));
            dispatch(
                updateHits([queries.concat([query.toLowerCase()]), languages])
            );
            setQuery("");
        } else {
            // setError(`Error: ${query} is already in your search list`);
            toast.closeAll();
            toast({
                title: "An error occurred.",
                description: `${query} is already in your search list`,
                status: "error",
                duration: 9000,
                isClosable: true,
              })
        }
    }

    function handleSuggestionClick(kw) {
        // add kw if it isn't in list already
        if (!queries.includes(kw.toLowerCase())) {
            dispatch(addTag(kw.toLowerCase()));
            dispatch(
                updateHits([queries.concat([kw.toLowerCase()]), languages])
            );
            setQuery("");
        } else {
            // setError(`Error: ${kw} is already in your search list`);
            toast.closeAll();
            toast({
                title: "An error occurred.",
                description: `${kw} is already in your search list`,
                status: "error",
                duration: 1000,
                isClosable: true,
              })
        }
    }

    function handleKeyDown(e) {
        // arrow up/down button should select next/previous list element
        if (e.keyCode === 38 && itemPosition > 0) {
            setItemPosition(itemPosition - 1);
        } else if (e.keyCode === 40 && itemPosition < suggestions.length - 1) {
            setItemPosition(itemPosition + 1);
        } // Enter key and check if suggestions isn't empty
        else if (e.keyCode === 13 && suggestions.length > 0) {
            setQuery(suggestions[itemPosition]);
        }
    }

    return (
        <div className="">
            <form onSubmit={handleSubmit} autoComplete="off">
                <div className="flex flex-row">
                    <Input
                        type="text"
                        name="name"
                        placeholder="e.g Rust"
                        value={query}
                        onChange={onTextChange}
                        onKeyDown={handleKeyDown}
                        className="hover:border-gray-400"
                    ></Input>
                    <Button colorScheme="teal" type="submit">
                        Submit
                    </Button>
                </div>

                {/* Suggestions box  */}
                <div className="">
                    {query.length > 0 && (
                        <ul className="list-none text-left m-0 p-0">
                            {suggestions.map((kw, index) => (
                                <li
                                    // check if selected item is this position
                                    className={"py-2 px-2 itemPosition-pointer hover:bg-gray-50 underline ".concat(
                                        itemPosition === index
                                            ? "bg-gray-50"
                                            : ""
                                    )}
                                    key={kw}
                                    onClick={(e) => handleSuggestionClick(kw)}
                                >
                                    {kw}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </form>

            <div className="flex flex-row flex-wrap">
                {queries.map((t) => (
                    <SearchTag text={t} />
                ))}
            </div>
        </div>
    );
}

export default SearchArea;
