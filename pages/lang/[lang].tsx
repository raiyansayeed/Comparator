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
        <div className="flex-grow flex-col items-center py-20 px-5">
            <Link href="/">
                <motion.button
                    whileTap={{ scale: 1.2 }}
                    className="absolute top-5 left-5"
                >
                    <ion-icon
                        name="arrow-back-outline"
                        size="large"
                    ></ion-icon>
                </motion.button>
            </Link>
            {typeof item !== "undefined" ? (
                <ul>
                    <li className="text-center m-5 ">
                        <p className="font-bold text-6xl">{item.name}</p>
                    </li>
                    <li className="m-2">
                        <p className="underline text-xl">Paradigms: </p>
                        
                        <p>{item.paradigms.join(", ")}</p>
                    </li>
                    <li className="m-2">
                        <p className="underline text-xl">Types: </p>
                        <p>{item.types.join(", ")}</p>
                    </li>
                    <li className="m-2">
                        <p className="underline text-xl">Creators: </p>
                        <p>{item.creators.join(", ")}</p>
                    </li>
                    <li className="m-2">
                        <p className="underline text-xl">Website: </p>
                        <a href={item.website}>{item.website}</a>
                    </li>
                    <li className="m-2">
                        <p className="underline text-xl">Sample hello world code</p>
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
