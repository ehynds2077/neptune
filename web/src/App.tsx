import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import persistStore from "redux-persist/es/persistStore";

import { NavBar } from "./components/NavBar";
import { selectUser } from "./features/auth/authSlice";
import { Home } from "./pages/Home";
import { store } from "./store";

let persistor = persistStore(store);

export const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const SideBar = useBreakpointValue({
    base: <DrawerSidebar isOpen={isOpen} onClose={onClose} />,
    lg: <PinnedSidebar />,
  });

  return (
    <>
      <NavBar onClickMenu={onOpen} />
      <Flex
        minH="100vh"
        justifyContent="center"
        alignItems="flex-start"
        bg="gray.200"
        _dark={{ bg: "gray.900" }}
      >
        {SideBar}
        <Flex p={5} alignItems="center" flexDirection="column" w="full">
          <Outlet />
        </Flex>
      </Flex>
    </>
  );
};

const PinnedSidebar = ({}) => {
  const user = useSelector(selectUser);
  return (
    <>
      {user && (
        <Box h="100vh" p={5} bg="gray.800" _light={{ bg: "gray.300" }} w="md">
          <Home />
        </Box>
      )}
    </>
  );
};

const DrawerSidebar = ({
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
