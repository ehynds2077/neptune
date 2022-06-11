import {
  Button,
  FormControl,
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
import { useState } from "react";

import { useAddProjectMutation } from "./projectApi";

export const AddProjectModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState("");

  const [addProject] = useAddProjectMutation();

  const handleAddProject = async () => {
    try {
      await addProject({ title }).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = async () => {
    setTitle("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add project</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              value={title}
              onChange={(event: any) => {
                setTitle(event.target.value);
              }}
              placeholder="List title"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddProject}>
            Save
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
