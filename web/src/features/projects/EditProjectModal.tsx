import {
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useEffect, useState } from "react";

import { useUpdateProjectMutation } from "./projectApi";
import { ProjectType } from "./ProjectType";

export const EditProjectModal = ({
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
  const [title, setTitle] = useState("");

  const [updateProject] = useUpdateProjectMutation();

  // Set fields to current values for selected item
  useEffect(() => {
    if (selected) {
      setTitle(selected.title);
    }
  }, [selected]);

  const handleUpdate = async () => {
    try {
      if (selected) {
        await updateProject({ id: selected.id, title }).unwrap();
      }
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  const disableSave = () => {
    return title === "";
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormLabel>Title</FormLabel>
          <Input
            mb={4}
            value={title}
            onChange={(event: any) => {
              setTitle(event.target.value);
            }}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            disabled={disableSave()}
            colorScheme="blue"
            mr={3}
            onClick={handleUpdate}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
