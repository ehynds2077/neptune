import { Box, Flex, Heading, List } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link as RouterLink } from "react-router-dom";

import { LinkRow } from "../components/LinkRow";
import { selectUser } from "../features/auth/authSlice";
import { ListsList } from "../features/lists/ListsList";
import { ProjectsList } from "../features/projects/ProjectsList";

export const Home = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  return (
    <Flex w="full" maxW="xl" alignItems="center" gap={3} direction="column">
      <List w="full" maxW="xl" spacing={3}>
        <LinkRow mb={4}>
          <Box
            as={RouterLink}
            to={"/inbox"}
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

        <ProjectsList />
        <ListsList />
      </List>
    </Flex>
  );
};
