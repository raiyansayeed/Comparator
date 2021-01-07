import { useSelector, useDispatch } from "react-redux";
import { selectHits } from "../redux/reducers/hitsSlice";
import { selectQueries } from "../redux/reducers/querySlice";
import { languageSlice, LanguageWithKw, selectLanguages } from "../redux/reducers/languageSlice";
import LanguageCard from "./LanguageCard";

function QueryHits() {
    const hits: LanguageWithKw[] = useSelector(selectHits);
    const queries = useSelector(selectQueries);
    const languages = useSelector(selectLanguages);;

    // get matching properties of a language with the current queries
    function selectProperties(lang: LanguageWithKw) {
        // initialize info_list with name property
        var info_obj = {
            name: lang["name"],
        };
        queries.forEach(function (query, index) {
            // TODO handle arr and string property vals
            var prop = Object.keys(lang).find((prop) => {
                // arr val
                if (lang[prop] instanceof Array) {
                    var tmp_arr = [];
                    lang[prop].forEach(function (item, index) {
                        tmp_arr.push(item.toLowerCase());
                    });
                    return tmp_arr.includes(query);
                }
                // TODO handle str
                else if (
                    typeof lang[prop] == "string" ||
                    lang[prop] instanceof String
                ) {
                    // handle bool val 
                    return ((lang[prop].toLowerCase() == query) || `${prop}: ${lang[prop].toLowerCase()}`.includes(query));
                }
            });
            switch (prop) {
                case "name":
                    break;
                case "keywords":
                    break;
                default:
                    // push key, value that corresponds with query
                    info_obj[prop] = lang[prop];
            }
        });
        return info_obj;
    }

    return (
        <div>
            <ul>
                { !(Array.isArray(queries) && queries.length) ? // select all languages if queries are empty
                <>
                    {languages.map((l) => {
                        return <LanguageCard infoData={l} />;
                    })}
                </>
                :
                <> 
                {hits.map((l) => {
                    var lang_info_list = selectProperties(l);
                    return <LanguageCard infoData={lang_info_list} />;
                })}
                </>
                }
            </ul>
        </div>
    );
}

export default QueryHits;
