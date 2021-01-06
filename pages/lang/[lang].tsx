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

    return (
        <div className="flex-grow flex-col items-center py-20 px-5">
            <Link href="/">
                <motion.button
                    whileTap={{ scale: 1.2 }}
                    className="absolute top-5 left-5"
                >
                    <ion-icon name="arrow-back-outline" size="large"></ion-icon>
                </motion.button>
            </Link>
            {typeof item !== "undefined" ? (
                <>
                    <Button
                        // ref={btnRef}
                        colorScheme="teal"
                        onClick={onOpen}
                    >
                        Open TOC
                    </Button>
                    <Drawer
                        isOpen={isOpen}
                        placement="right"
                        onClose={onClose}
                        // finalFocusRef={btnRef}
                    >
                        <DrawerOverlay>
                            <DrawerContent>
                                <DrawerCloseButton />
                                <DrawerHeader>Table of Contents</DrawerHeader>

                                <DrawerBody>
                                <Link href={`/lang/${item.name.toLowerCase()}/#paradigms`}>Paradigms</Link>
                                </DrawerBody>

                                <DrawerFooter>
                                </DrawerFooter>
                            </DrawerContent>
                        </DrawerOverlay>
                    </Drawer>
                    <ul>
                        <li className="text-center m-5 ">
                            <p className="font-bold text-6xl">{item.name}</p>
                        </li>
                        <li className="m-2">
                            <p className="underline text-xl" id="paradigms">Paradigms: </p>
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
                            <p className="underline text-xl">
                                Sample hello world code
                            </p>
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
                </>
            ) : (
                <h1>404 Error</h1>
            )}
        </div>
    );
}

export default LanguagePage;
