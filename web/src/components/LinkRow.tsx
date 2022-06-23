import { HStack } from "@chakra-ui/react";

export const LinkRow = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
  [x: string]: any;
}) => {
  return (
    <>
      <HStack
        px={1}
        _hover={{
          _dark: { bg: "whiteAlpha.300" },
          _light: { bg: "gray.200" },
        }}
        rounded="lg"
        _light={{ bg: "gray.100" }}
        _dark={{ bg: "whiteAlpha.200" }}
        {...rest}
      >
        {children}
      </HStack>
    </>
  );
};
