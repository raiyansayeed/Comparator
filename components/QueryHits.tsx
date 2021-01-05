import { useSelector, useDispatch } from "react-redux";
import { selectHits } from "../redux/reducers/hitsSlice";
import { selectQueries } from "../redux/reducers/querySlice";
import { LanguageWithKw } from "../redux/reducers/languageSlice";
import LanguageCard from "./LanguageCard";

function QueryHits() {
    const hits: LanguageWithKw[] = useSelector(selectHits);
    const queries = useSelector(selectQueries);

    // get matching properties of a language with the current queries 
    function selectProperties(lang: LanguageWithKw) {
        // initialize info_list with name property
        var info_obj = {
            name: lang["name"],
        }
        queries.forEach(function(query, index) {
            // console.log(`query: ${query}`);
            // console.log(lang);
            // TODO handle arr and string property vals
            var prop = Object.keys(lang).find(prop => {
                console.log(lang[prop])
                console.log(typeof(lang[prop]));
                // arr val
                if (lang[prop] instanceof Array) {
                    var tmp_arr = [];
                    lang[prop].forEach(function(item, index) {
                        tmp_arr.push(item.toLowerCase());
                    })
                    console.log("tmp");
                    console.log(tmp_arr);
                    return tmp_arr.includes(query);
                }
                // TODO handle str
                else if (typeof lang[prop] == "string" || lang[prop] instanceof String) {
                    console.log("tmp_str");
                    console.log(lang[prop]);
                    return lang[prop].toLowerCase() == query;
                }
                else return false;
            })
            switch (prop) {
                case "name":
                    break;
                default:
                    // push key, value that corresponds with query 
                    info_obj[prop] =  lang[prop];
            }
        });
        console.log("info_obj");
        console.log(info_obj);
        return info_obj;
        
    }

    return (
        <div>
            <ul>
                {hits.map((l) => {
                    var lang_info_list = selectProperties(l);
                    return (
                        <LanguageCard infoData={lang_info_list} />
                    )
                })}
            </ul>
        </div>
    );
}

export default QueryHits;
