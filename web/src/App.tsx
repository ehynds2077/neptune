import { ChakraProvider, Grid, theme } from "@chakra-ui/react";
import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

import { NavBar } from "./components/NavBar";
import { RequireAuth } from "./components/RequireAuth";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Welcome } from "./pages/Welcome";
import { AuthProvider } from "./providers/AuthProvider";
import { Provider } from "react-redux";
import { store } from "./store";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <NavBar />

          <Flex
            minH="100vh"
            justifyContent="center"
            alignItems="flex-start"
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
        </AuthProvider>
      </Router>
    </Provider>
  </ChakraProvider>
);
