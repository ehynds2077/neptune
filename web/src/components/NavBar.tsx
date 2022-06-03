import { Flex, Heading, Link } from "@chakra-ui/layout";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

import { ColorModeSwitcher } from "../ColorModeSwitcher";

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
      <ColorModeSwitcher justifySelf="flex-end" />
    </Flex>
  );
};
