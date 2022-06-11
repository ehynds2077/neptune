import { Flex, Heading, List } from "@chakra-ui/layout";
import { AddListModal } from "../components/AddListModal";
import {
  Text,
  Button,
  ModalBody,
  FormLabel,
  FormControl,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link as RouterLink } from "react-router-dom";

import { useGetProjectsQuery } from "../features/projects/projectApi";
import { selectUser } from "../features/auth/authSlice";
import {
  useAddListMutation,
  useGetListsQuery,
} from "../features/lists/listApi";
import { List_ListType } from "../features/lists/ListType";
import { AddProjectModal } from "../features/projects/AddProjectModal";

export const Home = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenProject,
    onClose: onCloseProject,
    onOpen: onOpenProject,
  } = useDisclosure();
  const [addListType, setAddListType] = useState<List_ListType | null>(null);

  const { data: lists = [] } = useGetListsQuery();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  const ListsOfType = ({
    type,
    title,
  }: {
    type: List_ListType;
    title: string;
  }) => {
    return (
      <List w="full" mb={8} maxW="xl" spacing={3}>
        <Text fontSize="xl" fontWeight="bold" alignSelf="start">
          {title}
        </Text>
        {lists
          .filter((list) => list.list_type === type)
          .map((list) => {
            return (
              <Button
                as={RouterLink}
                to={`/list/${list.id}`}
                justifyContent="start"
                w="full"
                key={list.id}
              >
                {list.title}
              </Button>
            );
          })}
        <Button
          onClick={() => {
            setAddListType(type);
            onOpen();
          }}
          w="full"
        >
          <AddIcon />
        </Button>
      </List>
    );
  };

  const ProjectsList = () => {
    const { data: projects = [] } = useGetProjectsQuery();
    return (
      <List w="full" mb={8} maxW="xl" spacing={3}>
        <Text fontSize="xl" fontWeight="bold" alignSelf="start">
          Projects
        </Text>
        {projects.map((project) => {
          return (
            <Button
              as={RouterLink}
              to={`/project/${project.id}`}
              justifyContent="start"
              w="full"
              key={project.id}
            >
              {project.title}
            </Button>
          );
        })}
        <Button onClick={onOpenProject} w="full">
          <AddIcon />
        </Button>
      </List>
    );
  };

  return (
    <Flex w="full" maxW="xl" alignItems="center" gap={3} direction="column">
      <Heading alignSelf="start">Lists</Heading>
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
        <ListsOfType title="Next" type="NEXT" />
        <ListsOfType title="Waiting" type="WAITING" />
        <ListsOfType title="Someday/Maybe" type="SOMEDAY" />
        <ListsOfType title="Agendas" type="AGENDA" />
        <ListsOfType title="Reference" type="REFERENCE" />
        <AddProjectModal isOpen={isOpenProject} onClose={onCloseProject} />
        <AddListModal
          isOpen={isOpen}
          onClose={onClose}
          listType={addListType}
        />
      </List>
    </Flex>
  );
};

// export const AddListForm = ({ type }: { type: List_ListType }) => {
//   const [newListTitle, setNewListTitle] = useState("");

//   return (
//     <Flex direction="row" w="full" gap={2}>
//       <Input
//         value={newListTitle}
//         placeholder="New List"
//         onChange={(event: any) => setNewListTitle(event.target.value)}
//       />
//       <Button px={10} onClick={handleAddList}>
//         Add list
//       </Button>
//     </Flex>
//   );
// };
