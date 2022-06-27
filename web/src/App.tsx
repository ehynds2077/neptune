import {
  ChakraProvider,
  createStandaloneToast,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  theme,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";

import { NavBar } from "./components/NavBar";
import { RequireAuth } from "./components/RequireAuth";
import { Login } from "./features/auth/Login";
import { SignUp } from "./features/auth/SignUp";
import { ListPage } from "./features/lists/ListPage";
import ProjectPage from "./features/projects/ProjectPage";
import { Home } from "./pages/Home";
import { Welcome } from "./pages/Welcome";
import { store } from "./store";

let persistor = persistStore(store);

export const App = () => {
  // const drawer = useBreakpointValue({ base: <Drawer /> });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <NavBar onClickMenu={onOpen} />
      <Flex
        minH="100vh"
        justifyContent="center"
        alignItems="flex-start"
        bg="gray.300"
        _dark={{ bg: "gray.900" }}
        p={5}
      >
        <Outlet />
        <Sidebar isOpen={isOpen} onClose={onClose} />
      </Flex>
    </>
  );
};

const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const drawerSize = useBreakpointValue({ base: "xs", md: "md" });
  return (
    <Drawer
      size={drawerSize}
      isOpen={isOpen}
      onClose={onClose}
      placement="left"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Menu</DrawerHeader>
        <DrawerBody>
          <Home />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
