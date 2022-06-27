import { HamburgerIcon } from "@chakra-ui/icons";
import { HStack } from "@chakra-ui/layout";
import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
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
      fontSize="3xl"
      icon={<HamburgerIcon />}
      variant="ghost"
      onClick={onClickMenu}
      aria-label="open menu"
    />
  );

  const menuButton = useBreakpointValue({
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
      p={5}
      bg="blue.700"
      color="white"
    >
      <HStack spacing={4}>
        {user && menuButton}
        <Heading justifySelf="center">
          <Link to={user ? "/inbox" : "/"} as={RouterLink}>
            Neptune
          </Link>
        </Heading>
      </HStack>
      <Flex gap={5} direction="row">
        <ColorModeSwitcher />
        {user ? (
          <>
            {/* <IconButton
              _light={{ _hover: { color: "black" } }}
              as={RouterLink}
              to="/app"
              variant="ghost"
              size="md"
              fontSize="xl"
              aria-label="Home"
              icon={<IoMdHome />}
            /> */}
            <AccountMenu />
          </>
        ) : (
          <>
            <Button colorScheme="blue" as={RouterLink} to="/login">
              Log In
            </Button>
            <Button colorScheme="blue" as={RouterLink} to="/signup">
              Sign Up{" "}
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};
