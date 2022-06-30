import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";

import { NavMenu } from "./NavMenu";

export const DrawerSidebar = ({
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
