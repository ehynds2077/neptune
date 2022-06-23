import { Button } from "@chakra-ui/react";
export const AuthButton = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
  [x: string]: any;
}) => (
  <Button
    colorScheme="blue"
    bg="blue.600"
    color="white"
    _hover={{ bg: "blue.400" }}
    {...rest}
  >
    {children}
  </Button>
);
