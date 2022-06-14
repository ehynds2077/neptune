import { List } from "@chakra-ui/react";
import { ReactNode } from "react";

export const NeptuneList = ({ children }: { children: ReactNode }) => (
  <List
    spacing={0}
    rounded="lg"
    overflow="hidden"
    colorScheme="gray"
    _light={{ bg: "gray.100" }}
    w="full"
  >
    {children}
  </List>
);
