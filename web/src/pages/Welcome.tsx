import { Flex, Heading, Link } from "@chakra-ui/layout";
import React from "react";
import { Link as RouteLink } from "react-router-dom";

export const Welcome = () => {
  return (
    <Flex direction="column" alignItems="center">
      <Heading>Welcome to neptune task manager</Heading>
      <Heading>
        Please{" "}
        <Link color="blue.600" as={RouteLink} to="/login">
          login here
        </Link>{" "}
        to continue
      </Heading>
    </Flex>
  );
};
