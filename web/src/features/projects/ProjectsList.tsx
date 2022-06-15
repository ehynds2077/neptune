import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  IconButton,
  List,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { Link as RouterLink } from "react-router-dom";

import { AddProjectModal } from "./AddProjectModal";
import { DeleteProjectModal } from "./DeleteProjectModal";
import { useGetProjectsQuery } from "./projectApi";
import { ProjectType } from "./ProjectType";

import { IoPencil } from "react-icons/io5";
import { EditProjectModal } from "./EditProjectModal";

export const ProjectsList = () => {
  const { data: projects = [] } = useGetProjectsQuery();
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null
  );
  const {
    isOpen: addIsOpen,
    onClose: addOnClose,
    onOpen: addOnOpen,
  } = useDisclosure();
  const {
    isOpen: editIsOpen,
    onClose: editOnClose,
    onOpen: editOnOpen,
  } = useDisclosure();
  const {
    isOpen: deleteIsOpen,
    onClose: deleteOnClose,
    onOpen: deleteOnOpen,
  } = useDisclosure();

  const handleConfirmDelete = (project: ProjectType) => {
    setSelectedProject(project);
    deleteOnOpen();
  };

  const handleShowEdit = (project: ProjectType) => {
    setSelectedProject(project);
    editOnOpen();
  };

  return (
    <List w="full" mb={8} maxW="xl" spacing={3}>
      <Text fontSize="xl" fontWeight="bold" alignSelf="start">
        Projects
      </Text>
      {projects.map((project, idx) => {
        return (
          <HStack key={idx}>
            <Button
              as={RouterLink}
              to={`/project/${project.id}`}
              justifyContent="start"
              w="full"
              key={project.id}
            >
              {project.title}
            </Button>
            <IconButton
              onClick={() => {
                handleShowEdit(project);
              }}
              aria-label="Edit project"
              icon={<IoPencil />}
            />
            <IconButton
              onClick={() => {
                handleConfirmDelete(project);
              }}
              aria-label="Delete project"
              icon={<IoMdTrash />}
            />
          </HStack>
        );
      })}
      <Button onClick={addOnOpen} w="full">
        <AddIcon />
      </Button>
      <AddProjectModal isOpen={addIsOpen} onClose={addOnClose} />
      <EditProjectModal
        isOpen={editIsOpen}
        onClose={editOnClose}
        selected={selectedProject}
        setSelected={setSelectedProject}
      />
      <DeleteProjectModal
        isOpen={deleteIsOpen}
        onClose={deleteOnClose}
        selected={selectedProject}
        setSelected={setSelectedProject}
      />
    </List>
  );
};
