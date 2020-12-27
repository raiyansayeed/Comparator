import { useSelector, useDispatch } from "react-redux";
import { selectLanguages } from "../redux/reducers/languageSlice";

import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import LanguageCard from "../components/LanguageCard";
import SearchArea from "../components/SearchArea";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import Home from "../components/Home";

function Index(pageProps) {

    return (
        <Provider store={store}>
            <Home />
        </Provider>
    );
}

export default Index;
