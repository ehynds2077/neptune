import { List_ListType } from "../features/lists/ListType";
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useAddListMutation } from "../features/lists/listApi";

export const AddListModal = ({
  isOpen,
  onClose,
  listType,
}: {
  isOpen: boolean;
  onClose: () => void;
  listType: List_ListType | null;
}) => {
  const [title, setTitle] = useState("");

  const [addList] = useAddListMutation();

  const handleSubmitForm = async function (
    event: React.FormEvent<HTMLDivElement>
  ) {
    event.preventDefault();
    handleAddList();
  };

  const handleAddList = async function () {
    try {
      if (listType) {
        await addList({ title: title, list_type: listType }).unwrap();
      } else {
        throw new Error("Problem finding list type to add");
      }
    } catch (e) {
      console.log(e);
    } finally {
      handleClose();
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
        <ModalHeader>Add list</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl as="form" onSubmit={handleSubmitForm}>
            <FormLabel>Title</FormLabel>
            <Input
              autoFocus
              value={title}
              onChange={(event: any) => {
                setTitle(event.target.value);
              }}
              placeholder="List title"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddList}>
            Save
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
