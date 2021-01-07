import Link from "next/link";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { selectHits } from "../redux/reducers/hitsSlice";
import { selectQueries } from "../redux/reducers/querySlice";

function LanguageCard(props) {
    const hits = useSelector(selectHits);
    const queries = useSelector(selectQueries);
    // obj containing properties of a language that match with current queries
    let info_obj = props.infoData;

    function handleClick(e) {
        e.preventDefault();
    }

    var slug = "/lang/" + info_obj["name"].toLowerCase();

    return (
        <motion.div
            className="p-6 m-6 mx-auto rounded-xl flex items-center border-gray-400 border border-solid"
            onClick={handleClick}
            whileHover={{
                scale: 1.02,
                transition: {
                    duration: 0.2,
                },
            }}
        >
            <ul>
                <li>
                    <b>{info_obj["name"]}</b>
                </li>
                {Object.keys(info_obj).map((prop, index) => {               
                    // only put 4 keywords on a language card
                    if (index > 4) return null

                    // ignore name prop as its already shown above
                    if (prop != "name" && prop != "keywords") {
                        var value;
                        if (info_obj[prop] instanceof Array) {
                            value = (
                                <>
                                    {info_obj[prop].map((val, index) => {
                                        // ignore comma for last item
                                        // check if str or (bool)str is in queries
                                        if (queries.includes(val.toLowerCase())) {
                                            if (index == info_obj[prop].length - 1)
                                                return <span> <span className="bg-yellow-500">{val} </span></span>
                                            else 
                                                return <span> <span className="bg-yellow-500">{val}</span>, </span>
                                        }
                                        else if (index == info_obj[prop].length - 1) {
                                            return <span> {val}</span>
                                        } 
                                        else {
                                            return <span> {val}, </span>
                                        }
                                    })
                                    }
                                </>
                            )
                        } else if (typeof info_obj[prop] == "string" || info_obj[prop] instanceof String) {
                            // value = ` ${info_obj[prop]}`;
                            // check for matching str or (bool)str val
                            if (queries.includes(info_obj[prop].toLowerCase()) || queries.includes(`${prop}: ${info_obj[prop].toLowerCase()}` ))
                                value = <span> <span className="bg-yellow-500">{info_obj[prop]}</span></span>
                            else 
                                value = <span> <span>{info_obj[prop]}</span></span>
                        }
                        return (
                            <li>
                                {/* Capitalize first letter of every word in prop */}
                                <u>{`${prop.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}:`}</u>
                                {value}
                            </li>
                        );
                    }
                    else return null;
                })}
                <li>
                    <button>
                        <Link href={slug}>More info!</Link>
                    </button>
                </li>
            </ul>
        </motion.div>
    );
}

export default LanguageCard;
