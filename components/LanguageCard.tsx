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

    console.log(info_obj);

    return (
        <motion.div
            className="languageCard p-6 m-6 mx-auto rounded-xl flex items-center"
            onClick={handleClick}
            whileHover={{
                scale: 1.2,
                transition: {
                    duration: 0.2,
                },
            }}
        >
            <ul>
                <li>
                    <b>{info_obj["name"]}</b>
                </li>
                {Object.keys(info_obj).map((prop) => {
                    // TODO handle string vals
                    // ignore name prop as its already shown above
                    if (prop != "name" && prop != "keywords") {
                        console.log(`prop: ${info_obj[prop]}`);
                        var value;
                        if (info_obj[prop] instanceof Array) {
                            value = (
                                <>
                                    {info_obj[prop].map((val, index) => {
                                        // ignore comma for last item
                                        if (index == info_obj[prop].length - 1) {
                                            return <span> {val}</span>
                                        } else if (queries.includes(val.toLowerCase()) || queries.includes(`${prop.toLowerCase()}: ${val.toLowerCase()}`)) {
                                            if (index == info_obj[prop].length - 1)
                                                return <span className="bg-yellow-500"> {val} </span>
                                            else 
                                            return <span> <span className="bg-yellow-500">{val}</span>, </span>
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
                            value = <span> <span className="bg-yellow-500">{info_obj[prop]}</span></span>
                        }
                        return (
                            <li>
                                {/* Capitalize first letter of every word in prop */}
                                <u>{`${prop.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}:`}</u>
                                {/* TODO add highlighting to matching prop words */}
                                {value}
                            </li>
                        );
                    }
                    else return null;
                })}
                {/* <li>
                    <u>Paradigms: </u>
                    {l.paradigms.join(", ")}
                </li>
                <li>
                    <u>Types: </u>
                    {l.types.join(", ")}
                </li>
                <li>
                    <u>Creators: </u>
                    {l.creators.join(", ")}
                </li>
                <li>
                    <u>Website: </u>
                    {l.website}
                </li> */}

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
