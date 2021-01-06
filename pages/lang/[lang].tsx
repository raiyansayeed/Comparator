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
import { useDisclosure } from "@chakra-ui/react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
} from "@chakra-ui/react";
import { ArrowBackIcon, HamburgerIcon } from "@chakra-ui/icons";

function LanguagePage(props) {
    const router = useRouter();
    const { lang } = router.query;

    const { isOpen, onOpen, onClose } = useDisclosure();
    // const btnRef = React.useRef()

    const languages = useSelector(selectLanguages);
    var item = languages.find((e) => e.name.toLowerCase() == lang);

    useEffect(() => {
        Prism.highlightAll();
    });

    function toTitleCase(str: string) {
        const capitalize = (str) =>
            str.length ? str[0].toUpperCase() + str.slice(1).toLowerCase() : "";

        const escape = (str) => str.replace(/./g, (c) => `\\${c}`);

        let seps = "_-/";

        let wordPattern = new RegExp(`[^${escape(seps)}]+`, "g");

        return str.replace(wordPattern, capitalize).split("_").join(" ");
    }

    return (
        <>
            <div className="sticky top-5 right-0">
                <Button
                    // ref={btnRef}
                    colorScheme="teal"
                    onClick={onOpen}
                    position="absolute"
                    right="5"
                    top="0"
                >
                    <HamburgerIcon />
                </Button>
                {/* <p>Hi</p> */}
            </div>
            <div className="flex-grow flex-col items-center py-20 px-5">
                <Link href="/">
                    {/* <motion.button
                    whileTap={{ scale: 1.2 }}
                    className="absolute top-5 left-5"
                >
                    <ArrowBackIcon className="absolute top-5 left-5"/>
                </motion.button> */}
                    <ArrowBackIcon
                        className="absolute top-5 left-5 cursor-pointer"
                        boxSize={10}
                    />
                </Link>
                {typeof item !== "undefined" ? (
                    <>
                        <Drawer
                            isOpen={isOpen}
                            placement="right"
                            onClose={onClose}
                            // finalFocusRef={btnRef}
                        >
                            <DrawerOverlay>
                                <DrawerContent>
                                    <DrawerCloseButton />
                                    <DrawerHeader>
                                        Table of Contents
                                    </DrawerHeader>

                                    <DrawerBody>
                                        {Object.keys(item).map(function (
                                            prop,
                                            index
                                        ) {
                                            if (
                                                prop == "name" ||
                                                prop == "keywords"
                                            )
                                                return null;
                                            return (
                                                <Link
                                                    href={`/lang/${item.name.toLowerCase()}/#${prop}`}
                                                >
                                                    <p className="cursor-pointer">
                                                        {toTitleCase(prop)}
                                                    </p>
                                                </Link>
                                            );
                                        })}
                                    </DrawerBody>

                                    <DrawerFooter></DrawerFooter>
                                </DrawerContent>
                            </DrawerOverlay>
                        </Drawer>
                        <ul>
                            {Object.keys(item).map(function (prop, index) {
                                // handle special properties separately
                                if (prop == "name") {
                                    return (
                                        <li className="text-center m-5">
                                            <p className="font-bold text-6xl">
                                                {item.name}
                                            </p>
                                        </li>
                                    );
                                } else if (prop == "keywords") {
                                    return null;
                                } else if (prop == "hello_world") {
                                    return (
                                        <li className="m-2" id="hello_world">
                                            <p className="underline text-xl">
                                                Sample Hello World Program
                                            </p>
                                            <pre>
                                                <code
                                                    className={
                                                        "language-" +
                                                        item.name.toLowerCase()
                                                    }
                                                >
                                                    {item.hello_world}
                                                </code>
                                            </pre>
                                        </li>
                                    );
                                } else if (prop == "website") {
                                    return (
                                        <li className="m-2" id="website">
                                            <p className="underline text-xl">
                                                Website:{" "}
                                            </p>
                                            <a href={item.website}>
                                                {item.website}
                                            </a>
                                        </li>
                                    );
                                } else if (
                                    item[prop] instanceof Array &&
                                    item[prop].length
                                ) {
                                    return (
                                        <li className="m-2" id={prop}>
                                            <p className="underline text-xl">
                                                {toTitleCase(prop)}:{" "}
                                            </p>
                                            <p>{item[prop].join(", ")}</p>
                                        </li>
                                    );
                                } else if (
                                    typeof item[prop] == "string" ||
                                    item[prop] instanceof String
                                ) {
                                    return (
                                        <li className="m-2" id={prop}>
                                            <p className="underline text-xl">
                                                {toTitleCase(prop)}:{" "}
                                            </p>
                                            <p>{item[prop]}</p>
                                        </li>
                                    );
                                }
                            })}
                        </ul>
                    </>
                ) : (
                    <h1>404 Error</h1>
                )}
            </div>
        </>
    );
}

export default LanguagePage;
