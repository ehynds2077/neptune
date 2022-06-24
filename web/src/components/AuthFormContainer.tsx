import { Flex, Stack } from "@chakra-ui/react";
import React from "react";

export const AuthFormContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <Flex direction="column" w="full" alignItems="center">
    <Stack
      _dark={{ bg: "whiteAlpha.200" }}
      bg="gray.100"
      p={5}
      rounded="xl"
      m={5}
      w="full"
      maxW="xl"
      spacing={3}
    >
      {children}
    </Stack>
  </Flex>
);
