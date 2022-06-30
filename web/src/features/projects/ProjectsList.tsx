import {
  Box,
  Collapse,
  IconButton,
  List,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { IoPencil } from "react-icons/io5";
import { Link as RouterLink } from "react-router-dom";

import { ExpandRow } from "../../components/ExpandRow";
import { LinkRow } from "../../components/LinkRow";
import { AddProjectModal } from "./AddProjectModal";
import { DeleteProjectModal } from "./DeleteProjectModal";
import { EditProjectModal } from "./EditProjectModal";
import { useGetProjectsQuery } from "./projectApi";
import { ProjectType } from "./ProjectType";

export const ProjectsList = ({ onClose }: { onClose: () => void }) => {
  const [expand, setExpand] = useState(true);
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
    <>
      <ExpandRow
        title="Projects"
        buttonTitle="Project"
        onClick={addOnOpen}
        isExpanded={expand}
        setExpand={setExpand}
      />
      <Collapse in={expand}>
        <List w="full" mb={8} maxW="xl" spacing={3}>
          {projects.map((project, idx) => {
            return (
              <LinkRow key={idx}>
                <Box
                  onClick={onClose}
                  as={RouterLink}
                  to={`/app/project/${project.id}`}
                  p={4}
                  px={4}
                  justifyContent="start"
                  w="full"
                  key={project.id}
                >
                  <Text fontSize="sm" fontWeight="bold">
                    {project.title}
                  </Text>
                </Box>
                <IconButton
                  variant="ghost"
                  onClick={() => {
                    handleShowEdit(project);
                  }}
                  aria-label="Edit project"
                  icon={<IoPencil />}
                />
                <IconButton
                  variant="ghost"
                  onClick={() => {
                    handleConfirmDelete(project);
                  }}
                  aria-label="Delete project"
                  icon={<IoMdTrash />}
                />
              </LinkRow>
            );
          })}
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
      </Collapse>
    </>
  );
};
