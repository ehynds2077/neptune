import { ChakraProvider, Flex, theme } from "@chakra-ui/react";
import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";

import { NavBar } from "./components/NavBar";
import { RequireAuth } from "./components/RequireAuth";
import { Home } from "./pages/Home";
import { Login } from "./features/auth/Login";
import { SignUp } from "./features/auth/SignUp";
import { Welcome } from "./pages/Welcome";
import { store } from "./store";

let persistor = persistStore(store);

export const App = () => (
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <NavBar />

          <Flex
            minH="100vh"
            justifyContent="center"
            alignItems="flex-start"
            // bg="gray.300"
            // _dark={{bg: }}
            p={5}
          >
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route
                path="/app"
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </Flex>
        </Router>
      </PersistGate>
    </Provider>
  </ChakraProvider>
);
