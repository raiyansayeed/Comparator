import { useSelector, useDispatch } from "react-redux";
import { selectHits } from "../redux/reducers/hitsSlice";
import Link from "next/link";

import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

import SearchArea from "./SearchArea";
import QueryHits from "./QueryHits";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { selectLanguages } from "../redux/reducers/languageSlice";

function Home(pageProps) {
    const languages = useSelector(selectLanguages);
    const router = useRouter();

    function getRandomPage(e) {
        // get random number from Languages array
        var random_index = Math.floor(Math.random() * (languages.length - 1));
        var name = languages[random_index]["name"].toLowerCase();
        router.push(`lang/${name}`);
    }

    return (
        <div className="flex flex-col py-5 px-5">
            <Head>
                <title>Comparator</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-row-reverse items-center">
                <div className="m-2">
                    <Link href="/about">
                        <a>About</a>
                    </Link>
                </div>
                <div className="m-2">
                    <a href="https://github.com/DoctaRay/Comparator">Github</a>
                </div>
            </div>

            <div className="flex flex-row items-center">
                <p className="font-bold text-6xl mt-2 mb-8">
                    Comparator
                </p>
                <Button
                    className="ml-10"
                    colorScheme="teal"
                    type="submit"
                    display={["none", "inline-flex"]}
                    onClick={getRandomPage}
                >
                    I'm feeling lucky
                </Button>
            </div>

            <SearchArea />

            <QueryHits />
        </div>
    );
}

export default Home;
