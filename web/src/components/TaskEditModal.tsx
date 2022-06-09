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
  Select,
} from "@chakra-ui/react";
import React from "react";
import { useEffect, useState } from "react";
import { useUpdateInboxItemMutation } from "../features/inbox/inboxApi";
import {
  useGetListsQuery,
  useUpdateListItemListMutation,
  useUpdateListItemMutation,
} from "../features/lists/listApi";

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
  const { selectedItem } = useList();
  const [updateListItem] = useUpdateListItemMutation();
  const [updateList] = useUpdateListItemListMutation();
  const [selectedListId, setSelectedListId] = useState("");

  const { data: lists = [] } = useGetListsQuery();

  const handleEditItem = async () => {
    try {
      if (selectedItem && selectedItem.listId) {
        if (title !== selectedItem.title) {
          await updateListItem({
            listId: selectedItem.listId,
            id: selectedItem.id,
            title,
          });
        }

        if (selectedListId !== selectedItem.listId) {
          await updateList({
            listId: selectedItem.listId,
            newListId: selectedListId,
            id: selectedItem.id,
          });
        }
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

  useEffect(() => {
    if (selectedItem?.listId) {
      setSelectedListId(selectedItem.listId);
    }
  }, [selectedItem?.listId]);

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
              <FormLabel>List</FormLabel>
              <Select
                value={selectedListId}
                onChange={(event: any) => {
                  setSelectedListId(event.target.value);
                }}
              >
                <option value="">Inbox</option>
                {lists.map((list) => {
                  return <option value={list.id}>{list.title}</option>;
                })}
              </Select>
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
