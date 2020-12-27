import Link from "next/link";
import { motion } from 'framer-motion';

function LanguageCard(props) {
    let l = props.jsonData;

    function handleClick(e) {
        e.preventDefault();
    }

    var slug = "/lang/" + l.name.toLowerCase();

    return (
        <motion.div className="languageCard" onClick={handleClick} whileHover={{
            scale: 1.2,
            transition: {
                duration: .2
            }
        }}>
            <h1>{l.name}</h1>
            <p>{l.paradigms}</p>
            <p>{l.types}</p>
            <p>{l.authors}</p>
            <p>{l.website}</p>
            <button>
                <Link href={slug}>More info!</Link>
            </button>
        </motion.div>
    );
}

export default LanguageCard;
