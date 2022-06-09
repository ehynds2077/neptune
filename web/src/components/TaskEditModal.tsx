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
import React from "react";
import { useEffect, useState } from "react";
import { useUpdateInboxItemMutation } from "../features/inbox/inboxApi";
import { useUpdateListItemMutation } from "../features/lists/listApi";

import { useInbox, useList } from "../providers/InboxProvider";

export const TaskEditModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState("");
  const { selectedItem } = useInbox();
  const [updateInboxItem] = useUpdateInboxItemMutation();

  const handleEditItem = async () => {
    try {
      if (selectedItem) {
        await updateInboxItem({ id: selectedItem.id, title });
      }
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title);
    }
  }, [selectedItem]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                value={title}
                onChange={(event: any) => {
                  setTitle(event.target.value);
                }}
                placeholder="Item title"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEditItem}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const ItemEditModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState("");
  const { selectedItem, listId } = useList();
  const [updateListItem] = useUpdateListItemMutation();

  const handleEditItem = async () => {
    try {
      if (selectedItem && listId) {
        await updateListItem({ listId, id: selectedItem.id, title });
      }
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title);
    }
  }, [selectedItem]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                value={title}
                onChange={(event: any) => {
                  setTitle(event.target.value);
                }}
                placeholder="Item title"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEditItem}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
