import { Flex, Heading } from "@chakra-ui/layout";
import React from "react";

import { useAuth } from "../providers/AuthProvider";

export const Home = () => {
  const auth = useAuth();

  return (
    <Flex direction="column" alignItems="center">
      <Heading>Welcome, {auth.user.name}</Heading>
    </Flex>
  );
};
