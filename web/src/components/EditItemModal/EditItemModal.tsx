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
import React, { useEffect } from "react";

import { ProjectListItemType } from "../../features/projects/ProjectType";
import { useList } from "../../providers/ListProvider";
import { useEditItem } from "./EditItemProvider";
import { ListSelectForm } from "./ListSelectForm";
import { ProjectSelectForm } from "./ProjectSelectForm";
import { TitleInputForm } from "./TitleInputForm";
import { TypeSelectForm } from "./TypeSelectForm";

export const EditItemModal = () => {
  const { selectedType, selectedProjectId, editItem, onClose, isOpen } =
    useEditItem();

  const disableSave = (): boolean => {
    if (selectedType === "PROJECT_SUPPORT") {
      return selectedProjectId === "";
    }
    return false;
    // Check if any fields are differnet
    // Check for required fields
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
            onClick={editItem}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
