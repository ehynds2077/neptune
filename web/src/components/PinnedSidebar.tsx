import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { selectUser } from "../features/auth/authSlice";
import { NavMenu } from "./NavMenu";

export const PinnedSidebar = () => {
  const user = useSelector(selectUser);
  return (
    <>
      {user && (
        <Box
          h="full"
          minH="100vh"
          p={5}
          px={10}
          bg="gray.800"
          _light={{ bg: "gray.300" }}
          w="50%"
          maxW="xl"
        >
          <NavMenu onClose={() => {}} />
        </Box>
      )}
    </>
  );
};
