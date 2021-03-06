import { HamburgerIcon } from "@chakra-ui/icons";
import { Flex, Heading, HStack, Link } from "@chakra-ui/layout";
import { Button, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { selectUser } from "../features/auth/authSlice";
import { AccountMenu } from "./AccountMenu";

export const NavBar = ({ onClickMenu }: { onClickMenu: () => void }) => {
  const user = useSelector(selectUser);

  const menuIconButton = (
    <IconButton
      _light={{ _hover: { color: "black" }, _active: { color: "black" } }}
      fontSize="3xl"
      icon={<HamburgerIcon />}
      variant="ghost"
      _focus={{
        boxShadow: "none",
      }}
      onClick={onClickMenu}
      aria-label="open menu"
    />
  );

  const menuButton = useBreakpointValue({
    base: menuIconButton,
    sm: menuIconButton,
    md: menuIconButton,
    lg: undefined,
    xl: undefined,
    "2xl": undefined,
  });
  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      width="full"
      flexWrap="wrap"
      p={5}
      bg="blue.700"
      color="white"
      rowGap={4}
    >
      <HStack justify="space-between" flex={1} spacing={4}>
        {user && menuButton}
        <Heading justifySelf="center">
          <Link to={user ? "/inbox" : "/"} as={RouterLink}>
            Neptune
          </Link>
        </Heading>
        <HStack spacing={2}>
          <ColorModeSwitcher />
          {user && <AccountMenu />}
        </HStack>
      </HStack>
      <Flex gap={5} ml="auto" justify="center" direction="row">
        {!user && (
          <>
            <Button colorScheme="blue" as={RouterLink} to="/login">
              Log In
            </Button>
            <Button colorScheme="blue" as={RouterLink} to="/signup">
              Sign Up
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};
