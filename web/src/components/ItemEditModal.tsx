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

import {
  useGetListsQuery,
  useUpdateListItemListMutation,
  useUpdateListItemMutation,
} from "../features/lists/listApi";
import { useList } from "../providers/ListProvider";

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

  const handleClose = async () => {
    setTitle("");
    setSelectedListId("");
    onClose();
  };

  const handleEditItem = async () => {
    try {
      if (selectedItem) {
        if (title !== selectedItem.title) {
          await updateListItem({
            listId: selectedItem.listId,
            id: selectedItem.id,
            title,
          }).unwrap();
        }
        if (selectedListId !== selectedItem.listId) {
          await updateList({
            listId: selectedItem.listId,
            newListId: selectedListId,
            id: selectedItem.id,
          }).unwrap();
        }
      }
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title);
      setSelectedListId(selectedItem.listId);
    }
  }, [selectedItem]);

  // useEffect(() => {
  //   if (selectedItem?.listId) {
  //     setSelectedListId(selectedItem.listId);
  //   }
  // }, [selectedItem?.listId]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
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
            <Button onClick={handleClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
