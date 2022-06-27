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
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";

import { App } from "./App";
import { MessageSpinner } from "./components/MessageSpinner";
import { RequireAuth } from "./components/RequireAuth";
import { Login } from "./features/auth/Login";
import { SignUp } from "./features/auth/SignUp";
import { ListPage } from "./features/lists/ListPage";
import ProjectPage from "./features/projects/ProjectPage";
import { Welcome } from "./pages/Welcome";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store";

let persistor = persistStore(store);

const { ToastContainer, toast } = createStandaloneToast();
export const showToast = toast;

const container = document.getElementById("root");
// container?.style.setProperty("height", "100vh");
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
          <Router>
            <Routes>
              <Route path="/" element={<App />}>
                <Route path="/" element={<Welcome />} />
                {/* <Route
                  path="/app"
                  element={
                    <RequireAuth>
                      <Home />
                    </RequireAuth>
                  }
                /> */}
                <Route
                  path="/inbox"
                  element={
                    <RequireAuth>
                      <ListPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/list/:listId"
                  element={
                    <RequireAuth>
                      <ListPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/project/:projectId"
                  element={
                    <RequireAuth>
                      <ProjectPage />
                    </RequireAuth>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
              </Route>
            </Routes>
          </Router>
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
