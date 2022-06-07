import { Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import React from "react";

export const Protected = () => {
  return (
    <Flex direction="column" alignItems="center">
      <Heading>Protected</Heading>
      <Stack color="white" bg="blue.900" p={5} rounded="xl" m={5} width="xl">
        <Text></Text>
      </Stack>
    </Flex>
  );
};
