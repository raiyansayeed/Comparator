import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import LanguageCard from "../components/language_card"
import SearchBox from "../components/search_area"

function Home(pageProps) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <SearchBox />

            <ul>
                {pageProps.jsonData.languages.map((l) => (
                    <LanguageCard jsonData={l} />
                ))}
            </ul>
        </div>
    );
}

type Language = {
    authors: string[];
    content: string;
};

export const getStaticProps: GetStaticProps = async (context) => {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    // const res = await fetch(
    //     "https://doctaray.github.io/ProgLangData/data.json"
    // );
    // const languages = await res.json();

    const jsonData = {
        languages: [
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
        ],
    };

    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            jsonData,
        },

        revalidate: 1, // in seconds
    };
};

export default Home;
