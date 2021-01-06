import "../styles/globals.css";
import "../styles/prism.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import { motion } from "framer-motion";
import { ChakraProvider } from "@chakra-ui/react";

// to remove errors from ion-icon web-component
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "ion-icon": IonIconProps;
        }
    }
}

interface IonIconProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
    > {
    name: string;
    size?: string;
}

function MyApp({ Component, pageProps, router }) {
    return (
        <Provider store={store}>
            <ChakraProvider>
                <motion.div
                    key={router.route}
                    initial="pageInitial"
                    animate="pageAnimate"
                    variants={{
                        pageInitial: {
                            opacity: 0,
                        },
                        pageAnimate: {
                            opacity: 1,
                        },
                    }}
                >
                    <Component {...pageProps} />
                </motion.div>
                {/* TODO check if ther's faster version of ionicons */}
                <script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"></script>
            </ChakraProvider>
        </Provider>
    );
}

export default MyApp;
