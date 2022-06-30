import {
  Center,
  ChakraProvider,
  ColorModeScript,
  createStandaloneToast,
  theme,
} from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";

import { MessageSpinner } from "./components/MessageSpinner";
import reportWebVitals from "./reportWebVitals";
import { NeptuneRoutes } from "./Routes";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store";

let persistor = persistStore(store);

const { ToastContainer, toast } = createStandaloneToast();
export const showToast = toast;

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <PersistGate
          loading={
            <Center w="100vw" h="100vh">
              <MessageSpinner title="Loading from local store" />
            </Center>
          }
          persistor={persistor}
        >
          <NeptuneRoutes />
        </PersistGate>
      </Provider>
    </ChakraProvider>
    <ToastContainer />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
