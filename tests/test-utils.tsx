import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { motion } from "framer-motion";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { NextRouter } from 'next/router';

// from https://github.com/vercel/next.js/issues/7479

// --------------------------------------------------
// Override the default test render with our own
//
// You can override the router mock like this:
//
// const { baseElement } = render(<MyComponent />, {
//   router: { pathname: '/my-custom-pathname' },
// });
// --------------------------------------------------
type DefaultParams = Parameters<typeof render>;
type RenderUI = DefaultParams[0];
type RenderOptions = DefaultParams[1] & { router?: Partial<NextRouter> };

// export function render(
//   ui: RenderUI,
//   { wrapper, router, ...options }: RenderOptions = {},
// ) {
//   if (!wrapper) {
//     wrapper = ({ children }) => (
//       <RouterContext.Provider value={{ ...mockRouter, ...router }}>
//         {children}
//       </RouterContext.Provider>
//     );
//   }

//   return render(ui, { wrapper, ...options });
// }

const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
};

const AllTheProviders = ({ children, pageProps, router }) => {
    return (
        <RouterContext.Provider value={{ ...mockRouter, ...router }}>
        <Provider store={store}>
            <ChakraProvider>
                <motion.div
                    key={"/"} // TODO: make editable
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
                    {children}
                </motion.div>
                {/* TODO check if ther's faster version of ionicons */}
                <script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"></script>
            </ChakraProvider>
        </Provider>
        </RouterContext.Provider>
    );
};

const customRender = (ui, options) =>
    render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
