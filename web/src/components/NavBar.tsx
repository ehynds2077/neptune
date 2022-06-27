import { Flex, Heading, Link } from "@chakra-ui/layout";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AccountMenu } from "./AccountMenu";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { Button, IconButton } from "@chakra-ui/react";
import { IoMdHome } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { HamburgerIcon } from "@chakra-ui/icons";

export const NavBar = ({ onClickMenu }: { onClickMenu: () => void }) => {
  const user = useSelector(selectUser);
  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      width="full"
      p={5}
      bg="blue.700"
      color="white"
    >
      <IconButton
        icon={<HamburgerIcon />}
        variant="ghost"
        onClick={onClickMenu}
        aria-label="open menu"
      />
      <Heading justifySelf="center">
        <Link to="/" as={RouterLink}>
          Neptune
        </Link>
      </Heading>
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
