import { Flex, Heading, Link } from "@chakra-ui/layout";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AccountMenu } from "./AccountMenu";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { IconButton } from "@chakra-ui/react";
import { IoMdHome } from "react-icons/io";

export const NavBar = () => {
  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      width="full"
      p={5}
      bg="blue.700"
      color="white"
    >
      <Heading justifySelf="center">
        <Link to="/" as={RouterLink}>
          Neptune
        </Link>
      </Heading>
      <Flex gap={5} direction="row">
        <IconButton
          as={RouterLink}
          to="/app"
          variant="ghost"
          size="md"
          aria-label="Home"
          icon={<IoMdHome />}
        />
        <ColorModeSwitcher />
        <AccountMenu />
      </Flex>
    </Flex>
  );
};
