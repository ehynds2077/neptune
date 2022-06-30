import { Flex, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { DrawerSidebar } from "./components/DrawerSidebar";
import { NavBar } from "./components/NavBar";
import { PinnedSidebar } from "./components/PinnedSidebar";

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
        flex={1}
        justifyContent="center"
        alignItems="stretch"
        bg="gray.200"
        // h="full"
        _dark={{ bg: "gray.900" }}
      >
        {SideBar}
        <Flex
          h="full"
          minH="100vh"
          p={5}
          alignItems="center"
          flexDirection="column"
          w="full"
        >
          <Outlet />
        </Flex>
      </Flex>
    </>
  );
};
