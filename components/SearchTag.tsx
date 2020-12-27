import { useSelector, useDispatch } from 'react-redux'
import { updateHits } from '../redux/reducers/hitsSlice';
import { 
    deleteTag,
    selectQueries
} from '../redux/reducers/querySlice'
import { selectLanguages } from "../redux/reducers/languageSlice";

function SearchTag(props) {

    const queries = useSelector(selectQueries);
    const languages = useSelector(selectLanguages);
    const dispatch = useDispatch();

    function handleClick(e) {
        e.preventDefault();
        // props.handleTagDelete(props.text);
        dispatch(deleteTag(props.text));
        dispatch(updateHits([queries.filter(x => x != props.text), languages]))
    }

    return (
        <div>
            <h1 className="bruh">
                {props.text}
            </h1>
            <button onClick={handleClick}>
                DELETE
            </button>
        </div>
    )
}

export default SearchTag;