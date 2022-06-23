import { List } from "@chakra-ui/react";
import { ReactNode } from "react";

export const NeptuneList = ({
  children,
  ...rest
}: {
  children: ReactNode;
  [x: string]: any;
}) => (
  <List
    spacing={0}
    rounded="lg"
    overflow="hidden"
    colorScheme="gray"
    _light={{ bg: "gray.100" }}
    _dark={{ bg: "whiteAlpha.100" }}
    w="full"
    p={4}
    pt={0}
    {...rest}
  >
    {children}
  </List>
);
