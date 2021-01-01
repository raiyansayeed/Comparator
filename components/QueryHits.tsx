import { useSelector, useDispatch } from 'react-redux'
import {
    selectHits
} from "../redux/reducers/hitsSlice"
import LanguageCard from "./LanguageCard";

function QueryHits() {
    const hits = useSelector(selectHits);

    return (
        <div>
            <h1>Query Results</h1>
            <ul>
                {hits.map((l) => (
                    <LanguageCard jsonData={l} />
                ))}
            </ul>
        </div>
    )
}

export default QueryHits;