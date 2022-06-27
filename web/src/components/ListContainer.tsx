import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

export const ListContainer = ({ children }: { children: ReactNode }) => (
  <Flex
    gap={3}
    direction="column"
    maxW="5xl"
    w="full"
    // h="full"
    alignItems="center"
  >
    {children}
  </Flex>
);
