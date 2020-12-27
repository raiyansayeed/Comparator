import { useSelector, useDispatch } from 'react-redux'
import {
    selectLanguages
} from "../redux/reducers/languageSlice"
import {
    selectHits
} from "../redux/reducers/hitsSlice"

import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import LanguageCard from "./LanguageCard";
import SearchArea from "./SearchArea"
import { useEffect, useState } from "react";

type Language = {
    authors: string[];
};

export const getStaticProps: GetStaticProps = async (context) => {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library

    // const res = await fetch(
    //     "https://doctaray.github.io/ProgLangData/data.json"
    // );
    // const languages = await res.json();

    const jsonData = [
        {
            name: "Javascript",
            paradigms: [
                "Procedural",
                "Structured",
                "Object-Oriented",
                "Functional",
                "Event-Driven",
            ],
            types: ["Compiled", "Interpreted"],
            website: "N/A",
            authors: ["Brendan Eich"],
        },
        {
            name: "Rust",
            paradigms: ["Functional", "Imperative", "Structured"],
            types: ["Compiled"],
            website: "www.rust-lang.org",
            authors: ["Graydon Hoare"],
        },
    ];

    return {
        props: {
            jsonData,
        },

        revalidate: 1, // in seconds
    };
};

function Home(pageProps) {
    // const [origLangList, setOrigLangList] = useState(pageProps.jsonData);
    const languages = useSelector(selectLanguages);
    const hits = useSelector(selectHits);
    // var l = createKeywords(pageProps.jsonData);
    // const [langList, setLangList] = useState(l);
    const [queries, setQueries] = useState([]);
    // const [queryResults, setQueryResults] = useState([]);

    function onQueryChange(newQueryList) {
        // setQueries(newQueryList);
    }

    // update if queries changes
    // useEffect(() => {
    //     // createKeywords(langList);
    //     // createHits(langList);
    // }, [queries]);

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <SearchArea />

            <ul>
                <h1>Queries</h1>
                {queries.map((l) => (
                    <h1>{l}</h1>
                ))}
            </ul>

            <ul>
                <h1>Query Results</h1>
                {hits.map((l) => (
                    <LanguageCard jsonData={l} />
                ))}
            </ul>
        </div>
    );
}

export default Home;
