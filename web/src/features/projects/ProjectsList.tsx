import { List } from "@chakra-ui/react";
import { useGetProjectsQuery } from "./projectApi";
import { Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { AddProjectModal } from "./AddProjectModal";
import { useDisclosure } from "@chakra-ui/react";

export const ProjectsList = () => {
  const { data: projects = [] } = useGetProjectsQuery();
  const { isOpen, onClose, onOpen } = useDisclosure();
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
      <Button onClick={onOpen} w="full">
        <AddIcon />
      </Button>
      <AddProjectModal isOpen={isOpen} onClose={onClose} />
    </List>
  );
};
