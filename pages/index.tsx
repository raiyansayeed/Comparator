import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import LanguageCard from "../components/language_card";
import SearchArea from "../components/search_area"
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
    var l = createKeywords(pageProps.jsonData);
    const [langList, setLangList] = useState(l);
    const [queries, setQueries] = useState([]);
    const [queryResults, setQueryResults] = useState([]);

    var keywordList = [];
    // create keywords for each lang
    function createKeywords(l_list) {
        console.log("effect");
        console.log(l_list);
        var newList = [];
        l_list.forEach(function(item, index) {
            var tmp = [];
            // console.log(item)
            Object.keys(item).forEach(function(key, index) {
                var k = item[key];

                // handle single str
                if (typeof k === 'string' || k instanceof String) {
                    // handle N/A case
                    if (k == "N/A") return;

                    // handle duplicates
                    if (item.hasOwnProperty('keywords') && item["keywords"].includes(k)) return;

                    tmp.push(item[key]);
                }

                // handle array
                if (k instanceof Array) {
                    k.forEach(function(k_item, index) {
                        // handle duplicates
                        if (item.hasOwnProperty('keywords') && item["keywords"].includes(k_item)) return;

                        tmp.push(k_item);
                    }) 
                }
                
            })
            var newLang = item;
            if (newLang.hasOwnProperty('keywords')) newLang["keywords"] = newLang["keywords"].concat(tmp);
            else newLang["keywords"] = tmp;
            newList.push(newLang);
        });
        console.log("New list");
        console.log(newList);
        return newList;
    }
    
    function createHits(l_list) {
        var tmp = [];
        queries.forEach(function(query, index) {
            l_list.forEach(function(item, index) {
                console.log("query");
                console.log(query);
                console.log(item);
                if (item.hasOwnProperty('keywords') && item["keywords"].includes(query)) {
                    tmp.push(item);
                }
            })
        });
        console.log("createHits");
        console.log(queryResults);
        // push lang object into query results
        setQueryResults(tmp);
    }

    function onQueryChange(newQueryList) {
        setQueries(newQueryList);
    }

    // update if queries changes
    useEffect(() => {
        // createKeywords(langList);
        createHits(langList);
    }, [queries]);

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <SearchArea queries={queries} onQueryChange={onQueryChange} />

            <ul>
                <h1>Queries</h1>
                {queries.map((l) => (
                    <h1>{l}</h1>
                ))}
            </ul>

            <ul>
                <h1>Query Results</h1>
                {queryResults.map((l) => (
                    <LanguageCard jsonData={l} />
                ))}
            </ul>
        </div>
    );
}

export default Home;
