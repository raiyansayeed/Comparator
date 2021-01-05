import Link from "next/link";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { selectHits } from "../redux/reducers/hitsSlice";

function LanguageCard(props) {
    const hits = useSelector(selectHits);
    // obj containing properties of a language that match with current queries
    let info_obj = props.infoData;

    function handleClick(e) {
        e.preventDefault();
    }

    var slug = "/lang/" + info_obj["name"].toLowerCase();

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
                        var value = "";
                        if (info_obj[prop] instanceof Array) {
                            value = ` ${info_obj[prop].join(", ")}`
                        } else if (typeof info_obj[prop] == "string" || info_obj[prop] instanceof String) {
                            value = ` ${info_obj[prop]}`;
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
