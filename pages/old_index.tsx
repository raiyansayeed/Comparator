import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

function Home(pageProps) {
    console.log(pageProps.languages);
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>

                <p className={styles.description}>
                    Get started by editing{" "}
                    <code className={styles.code}>pages/index.js</code>
                </p>

                <ul>
                    {pageProps.languages.languages.map((l) => (
                        <li>{l.name}</li>
                    ))}
                </ul>

                <div className={styles.grid}>
                    <a href="https://nextjs.org/docs" className={styles.card}>
                        <h3>Documentation &rarr;</h3>
                        <p>
                            Find in-depth information about Next.js features and
                            API.
                        </p>
                    </a>

                    <a href="https://nextjs.org/learn" className={styles.card}>
                        <h3>Learn &rarr;</h3>
                        <p>
                            Learn about Next.js in an interactive course with
                            quizzes!
                        </p>
                    </a>

                    <a
                        href="https://github.com/vercel/next.js/tree/master/examples"
                        className={styles.card}
                    >
                        <h3>Examples &rarr;</h3>
                        <p>
                            Discover and deploy boilerplate example Next.js
                            projects.
                        </p>
                    </a>

                    <a
                        href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        className={styles.card}
                    >
                        <h3>Deploy &rarr;</h3>
                        <p>
                            Instantly deploy your Next.js site to a public URL
                            with Vercel.
                        </p>
                    </a>

                    <a
                        href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        className={styles.card}
                    >
                        <h3>Deploy &rarr;</h3>
                        <p>
                            Instantly deploy your Next.js site to a public URL
                            with Vercel.
                        </p>
                    </a>
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{" "}
                    <img
                        src="/vercel.svg"
                        alt="Vercel Logo"
                        className={styles.logo}
                    />
                </a>
            </footer>
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

    const languages = {
        "languages": [
            {
                "name": "Javascript",
                "paradigms": [
                    "Procedural",
                    "Structured",
                    "Object-Oriented",
                    "Functional",
                    "Event-Driven"
                ],
                "types": ["Compiled", "Interpreted"],
                "website": "N/A",
                "authors": ["Brendan Eich"]
            },
            {
                "name": "Rust",
                "paradigms": [
                    "Functional",
                    "Imperative",
                    "Structured"
                ],
                "types": ["Compiled"],
                "website": "www.rust-lang.org",
                "authors": ["Graydon Hoare"]
            }
        ]
    }
    
    

    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    console.log(languages);
    return {
        props: {
            languages,
        },

        revalidate: 1 // in seconds
    };
};

export default Home;
