import Link from "next/link";
import { motion } from "framer-motion";

function LanguageCard(props) {
    let l = props.jsonData;

    function handleClick(e) {
        e.preventDefault();
    }

    var slug = "/lang/" + l.name.toLowerCase();

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
                    <b>{l.name}</b>
                </li>
                <li>
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
                </li>
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
