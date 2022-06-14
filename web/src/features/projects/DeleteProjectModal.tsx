import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useDeleteProjectMutation } from "./projectApi";
import { ProjectType } from "./ProjectType";

export const DeleteProjectModal = ({
  isOpen,
  onClose,
  selected,
  setSelected,
}: {
  isOpen: boolean;
  onClose: () => void;
  selected: ProjectType | null;
  setSelected: (list: ProjectType | null) => void;
}) => {
  const cancelRef = useRef(null);
  const [deleteProject] = useDeleteProjectMutation();

  const handleDelete = async () => {
    try {
      if (selected && selected.id) {
        await deleteProject({ id: selected.id }).unwrap();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSelected(null);
      onClose();
    }
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete Project</AlertDialogHeader>
            <AlertDialogBody>
              {selected && selected.title}
              <Text>
                Are you sure you want to delete this project? You can't undo
                this action.
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" ml={3} onClick={handleDelete}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
