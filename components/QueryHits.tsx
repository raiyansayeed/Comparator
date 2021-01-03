import { useSelector, useDispatch } from 'react-redux'
import {
    selectHits,
    selectInList,
} from "../redux/reducers/hitsSlice"
import LanguageCard from "./LanguageCard";

function QueryHits() {
    const hits = useSelector(selectHits);
    const inList: boolean = useSelector(selectInList);

    return (
        <div>
            <ul>
                { !inList ? (
                    <p></p>
                ) : (
                    <p>Query already in requirements</p>
                )}
                {hits.map((l) => (
                    <LanguageCard jsonData={l} />
                ))}
            </ul>
        </div>
    )
}

export default QueryHits;