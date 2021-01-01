import { useSelector, useDispatch } from 'react-redux'
import {
    selectHits
} from "../redux/reducers/hitsSlice"

import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import SearchArea from "./SearchArea"
import QueryHits from "./QueryHits";
import { useEffect, useState } from "react";

type Language = {
    creators: string[];
};

function Home(pageProps) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Prog Lang Website</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <SearchArea />

            <QueryHits />
        </div>
    );
}

export default Home;
