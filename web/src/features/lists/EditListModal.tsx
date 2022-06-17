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
  Select,
} from "@chakra-ui/react";
import React from "react";
import { useEffect, useState } from "react";
import { useGetListsQuery, useUpdateListMutation } from "./listApi";

import { ListType } from "./ListType";

export const EditListModal = ({
  isOpen,
  onClose,
  selected,
  setSelected,
}: {
  isOpen: boolean;
  onClose: () => void;
  selected: ListType | null;
  setSelected: (list: ListType | null) => void;
}) => {
  const [title, setTitle] = useState("");
  const [parentId, setParentId] = useState("");

  const { data: lists = [] } = useGetListsQuery();

  const [updateList] = useUpdateListMutation();

  // Set fields to current values for selected item
  useEffect(() => {
    if (selected) {
      setTitle(selected.title);
      setParentId(selected.list_parent_id);
    }
  }, [selected]);

  const handleUpdate = async () => {
    try {
      if (selected) {
        await updateList({
          id: selected.id,
          title,
          list_parent_id: parentId,
        }).unwrap();
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
        <ModalHeader>Edit List</ModalHeader>
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
          <FormLabel>Parent list</FormLabel>
          <Select
            mb={4}
            value={parentId}
            onChange={(event: any) => {
              setParentId(event.target.value);
            }}
          >
            {lists
              .filter(
                (list) =>
                  list.list_type === selected?.list_type &&
                  list.id !== selected.id
              )
              .map((list, idx) => {
                if (list.depth > 0) {
                  return (
                    <option key={idx} value={list.id}>
                      &nbsp;&nbsp;
                      {list.title}
                    </option>
                  );
                }
                return (
                  <option key={idx} value={list.id}>
                    {list.title}
                  </option>
                );
              })}
          </Select>
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
