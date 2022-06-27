import { Flex, Heading, List } from "@chakra-ui/layout";
import { HStack } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { Collapse, Icon, IconButton, Text } from "@chakra-ui/react";
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
import { LinkRow } from "../components/LinkRow";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";

export const Home = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [expandProjects, setExpandProjects] = useState(true);
  const [expandLists, setExpandLists] = useState(true);

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
        <LinkRow mb={4}>
          <Box
            as={RouterLink}
            to={"/inbox"}
            p={4}
            px={4}
            justifyContent="start"
            w="full"
          >
            <Text fontWeight="bold">Inbox</Text>
          </Box>
        </LinkRow>

        <ExpandRow
          title="Projects"
          isExpanded={expandProjects}
          setExpand={setExpandProjects}
        />
        <Collapse in={expandProjects}>
          <ProjectsList />
        </Collapse>

        <ExpandRow
          title="Lists"
          isExpanded={expandLists}
          setExpand={setExpandLists}
        />
        <Collapse in={expandLists}>
          <ListsList lists={lists} title="Next" type="NEXT" />
          <ListsList lists={lists} title="Waiting" type="WAITING" />
          <ListsList lists={lists} title="Someday/Maybe" type="SOMEDAY" />
          <ListsList lists={lists} title="Agendas" type="AGENDA" />
          <ListsList lists={lists} title="Reference" type="REFERENCE" />
        </Collapse>
      </List>
    </Flex>
  );
};

const ExpandRow = ({
  title,
  isExpanded,
  setExpand,
}: {
  title: string;
  isExpanded: boolean;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <HStack
    py={1}
    alignItems="center"
    rounded="md"
    _hover={{ bg: "whiteAlpha.100", cursor: "pointer" }}
    onClick={() => setExpand((expand) => !expand)}
  >
    <Icon m={3} as={isExpanded ? ChevronDownIcon : ChevronRightIcon} />

    <Text fontSize="xl" fontWeight="bold">
      {title}
    </Text>
  </HStack>
);
