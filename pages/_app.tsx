import '../styles/globals.css'
import { Provider } from "react-redux";
import store from "../redux/store";
import { motion } from 'framer-motion';

function MyApp({ Component, pageProps, router}) {
  return (
    <Provider store={store}>
      <motion.div key={router.route} initial="pageInitial" animate="pageAnimate" variants={{
        pageInitial: {
          opacity: 0
        },
        pageAnimate: {
          opacity: 1
        }
      }}>
      <Component {...pageProps} />
      </motion.div>
    </Provider>
  )
}

export default MyApp
