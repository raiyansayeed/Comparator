import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { selectLanguages } from "../../redux/reducers/languageSlice";
import SearchArea from "../../components/SearchArea";
import QueryHits from "../../components/QueryHits";
import styles from "../../styles/Home.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import Prism from "prismjs";
import { motion } from "framer-motion";

function LanguagePage(props) {
    const router = useRouter();
    const { lang } = router.query;

    const languages = useSelector(selectLanguages);
    var item = languages.find((e) => e.name.toLowerCase() == lang);

    useEffect(() => {
        Prism.highlightAll();
    });

    return (
        <div className={"grid ".concat(styles.container)}>
            <Link href="/">
                <motion.button
                    whileTap={{ scale: 1.2 }}
                    className="absolute top-0 left-0"
                >
                    <ion-icon
                        name="arrow-back-outline"
                        size="large"
                        class="absolute top-0 left-0"
                    ></ion-icon>
                </motion.button>
            </Link>
            <h1>Page info</h1>
            {typeof item !== "undefined" ? (
                <ul>
                    <li>
                        <b>{item.name}</b>
                    </li>
                    <li>
                        <u>Paradigms: </u>
                        {item.paradigms.join(", ")}
                    </li>
                    <li>
                        <u>Types: </u>
                        {item.types.join(", ")}
                    </li>
                    <li>
                        <u>Creators: </u>
                        {item.creators.join(", ")}
                    </li>
                    <li>
                        <u>Website: </u>
                        {item.website}
                    </li>
                    <li>
                        <u>Sample hello world code</u>
                        <pre>
                            <code
                                className={
                                    "language-" + item.name.toLowerCase()
                                }
                            >
                                {item.hello_world}
                            </code>
                        </pre>
                    </li>
                </ul>
            ) : (
                <h1>404 Error</h1>
            )}
        </div>
    );
}

export default LanguagePage;
