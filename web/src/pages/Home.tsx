import { Flex, Heading, List } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link as RouterLink } from "react-router-dom";

import { selectUser } from "../features/auth/authSlice";
import { ListsList } from "../features/lists/ListsList";
import { ProjectsList } from "../features/projects/ProjectsList";
import { useGetListsQuery } from "../features/lists/listApi";

export const Home = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  const { data: lists = [] } = useGetListsQuery();

  return (
    <Flex w="full" maxW="xl" alignItems="center" gap={3} direction="column">
      <Heading size="lg" alignSelf="start">
        Home
      </Heading>
      <List w="full" maxW="xl" spacing={3}>
        <Button
          mb={4}
          justifyContent="start"
          w="full"
          as={RouterLink}
          to="/inbox"
        >
          Inbox
        </Button>

        <ProjectsList />
        <Text fontSize="xl" fontWeight="bold" alignSelf="start">
          Lists
        </Text>
        <ListsList lists={lists} title="Next" type="NEXT" />
        <ListsList lists={lists} title="Waiting" type="WAITING" />
        <ListsList lists={lists} title="Someday/Maybe" type="SOMEDAY" />
        <ListsList lists={lists} title="Agendas" type="AGENDA" />
        <ListsList lists={lists} title="Reference" type="REFERENCE" />
      </List>
    </Flex>
  );
};
