import { Box, Flex, List } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import { ListsList } from "../features/lists/ListsList";
import { ProjectsList } from "../features/projects/ProjectsList";
import { LinkRow } from "./LinkRow";

export const NavMenu = ({ onClose }: { onClose: () => void }) => {
  return (
    <Flex w="full" maxW="xl" alignItems="center" gap={3} direction="column">
      <List w="full" maxW="xl" spacing={3}>
        <LinkRow mb={4}>
          <Box
            as={RouterLink}
            onClick={onClose}
            to={"/app/inbox"}
            p={4}
            px={4}
            justifyContent="start"
            w="full"
          >
            <Text fontSize="sm" fontWeight="bold">
              Inbox
            </Text>
          </Box>
        </LinkRow>

        <ProjectsList onClose={onClose} />
        <ListsList onClose={onClose} />
      </List>
    </Flex>
  );
};
