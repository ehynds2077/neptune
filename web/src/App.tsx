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
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { NavBar } from "./components/NavBar";
import { NavMenu } from "./components/NavMenu";
import { selectUser } from "./features/auth/authSlice";

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

const PinnedSidebar = () => {
  const user = useSelector(selectUser);
  return (
    <>
      {user && (
        <Box
          h="full"
          p={5}
          px={10}
          bg="gray.800"
          _light={{ bg: "gray.300" }}
          w="50%"
          maxW="xl"
        >
          <NavMenu onClose={() => {}} />
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
          <NavMenu onClose={onClose} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
