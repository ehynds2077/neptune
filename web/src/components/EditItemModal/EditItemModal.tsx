import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

import { EditItemModalProps } from ".";
import { useEditItem } from "./EditItemProvider";
import { ListSelectForm } from "./ListSelectForm";
import { ProjectSelectForm } from "./ProjectSelectForm";
import { TitleInputForm } from "./TitleInputForm";
import { TypeSelectForm } from "./TypeSelectForm";

export const EditItemModal = ({ isOpen, onClose }: EditItemModalProps) => {
  const {
    selectedType,
    selectedProjectId,
    setTitle,
    setSelectedListId,
    editItem,
  } = useEditItem();

  const handleClose = async () => {
    setTitle("");
    setSelectedListId("");
    onClose();
  };

  const handleEditItem = async () => {
    editItem();
    handleClose();
  };

  const disableSave = (): boolean => {
    if (selectedType === "PROJECT_SUPPORT") {
      return selectedProjectId === "";
    }
    return false;
    // Check if any fields are differnet
    // Check for required fields
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TitleInputForm />
          <TypeSelectForm />
          <ListSelectForm />
          <ProjectSelectForm />
        </ModalBody>

        <ModalFooter>
          <Button
            disabled={disableSave()}
            colorScheme="blue"
            mr={3}
            onClick={handleEditItem}
          >
            Save
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
