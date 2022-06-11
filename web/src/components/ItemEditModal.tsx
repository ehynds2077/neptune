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
import { listTypes, List_ListType } from "../features/lists/ListType";
import { useGetProjectsQuery } from "../features/projects/projectApi";
import { useList } from "../providers/ListProvider";

export interface ItemEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ItemDict {
  NEXT: string;
  WAITING: string;
  SOMEDAY: string;
  AGENDA: string;
  REFERENCE: string;
  PROJECT_SUPPORT: string;
  [key: string]: string;
}
export const itemTypeDict: ItemDict = {
  NEXT: "Next",
  WAITING: "Waiting",
  SOMEDAY: "Someday / Maybe",
  AGENDA: "Agenda",
  REFERENCE: "Reference",
  PROJECT_SUPPORT: "Project Support",
};

export const ItemEditModal = ({ isOpen, onClose }: ItemEditModalProps) => {
  const { selectedItem, listType } = useList();

  const [title, setTitle] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedListId, setSelectedListId] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");

  // RTK Query hooks
  const { data: lists = [] } = useGetListsQuery();
  const { data: projects = [] } = useGetProjectsQuery();
  const [updateListItem] = useUpdateListItemMutation();
  const [updateList] = useUpdateListItemListMutation();

  // Set fields to current values for selected item
  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title);
      setSelectedListId(selectedItem.listId);
      if (selectedItem.listId) {
        console.log(listType);
        setSelectedType(listType);
      }
    }
  }, [selectedItem, listType]);

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

        if (selectedType !== listType && selectedType === "") {
          await updateList({
            listId: selectedItem.listId,
            newListId: "",
            id: selectedItem.id,
          }).unwrap();
        }
        if (
          selectedListId !== selectedItem.listId ||
          selectedType !== listType
        ) {
          await updateList({
            listId: selectedItem.listId,
            newListId: selectedType === "" ? "" : selectedListId,
            id: selectedItem.id,
          }).unwrap();
        }
      }
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  const allowSave = () => {
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
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              mb={4}
              value={title}
              onChange={(event: any) => {
                setTitle(event.target.value);
              }}
              placeholder="Item title"
            />

            <FormLabel>Type</FormLabel>
            <Select
              mb={4}
              value={selectedType}
              onChange={(event: any) => {
                setSelectedType(event.target.value);
              }}
            >
              <option value="">Inbox</option>
              {Object.keys(itemTypeDict).map((key) => {
                return <option value={key}>{itemTypeDict[key]}</option>;
              })}
            </Select>

            {selectedType !== "PROJECT_SUPPORT" && selectedType !== "" && (
              <>
                <FormLabel>List</FormLabel>
                <Select
                  mb={4}
                  value={selectedListId}
                  onChange={(event: any) => {
                    setSelectedListId(event.target.value);
                  }}
                >
                  <option value=""></option>
                  {lists
                    .filter((list) => list.list_type === selectedType)
                    .map((list) => {
                      return <option value={list.id}>{list.title}</option>;
                    })}
                </Select>
              </>
            )}
            {selectedType !== "" && (
              <>
                <FormLabel>Project</FormLabel>
                <Select
                  mb={4}
                  value={selectedProjectId}
                  onChange={(event: any) => {
                    setSelectedProjectId(event.target.value);
                  }}
                >
                  <option value="">None</option>
                  {projects.map((project) => {
                    return <option value={project.id}>{project.title}</option>;
                  })}
                </Select>
              </>
            )}
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
  );
};
