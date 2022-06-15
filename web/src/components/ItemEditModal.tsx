import {
  Button,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
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
import { listTypeDict } from "../features/lists/ListType";
import { useGetProjectsQuery } from "../features/projects/projectApi";
import { useList } from "../providers/ListProvider";

export interface ItemEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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
      setSelectedListId(selectedItem.list_id);
      setSelectedProjectId("");
      if (selectedItem.project) {
        setSelectedProjectId(selectedItem.project.id);
      }
      if (selectedItem.list_id) {
        console.log(listType);
        setSelectedType(listType);
      } else {
        setSelectedType("");
      }
    }
  }, [selectedItem, listType]);

  const handleClose = async () => {
    setTitle("");
    setSelectedListId("");
    onClose();
  };

  const projectId = () => {
    if (selectedItem && selectedItem.project) {
      return selectedItem.project.id;
    } else {
      return "";
    }
  };

  const handleEditItem = async () => {
    console.log(projects);
    try {
      if (selectedItem) {
        if (title !== selectedItem.title || selectedProjectId !== projectId()) {
          const project = projects.find(
            (project) => project.id === selectedProjectId
          );
          await updateListItem({
            list_id: selectedItem.list_id,
            id: selectedItem.id,
            project_id: selectedProjectId,
            project,
            title,
          }).unwrap();
        }
        if (
          selectedListId !== selectedItem.list_id ||
          selectedType !== listType
        ) {
          const newListId =
            selectedType !== ""
              ? selectedType !== "PROJECT_SUPPORT"
                ? selectedListId
                : "PROJECT_SUPPORT"
              : "";
          await updateList({
            list_id: selectedItem.list_id,
            new_list_id: newListId,
            project_id: selectedProjectId,
            id: selectedItem.id,
          }).unwrap();
        }
      }
      handleClose();
    } catch (e) {
      console.log(e);
    }
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
            {Object.keys(listTypeDict).map((key) => {
              return <option value={key}>{listTypeDict[key]}</option>;
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
              <FormControl
                isInvalid={
                  selectedType === "PROJECT_SUPPORT" && selectedProjectId === ""
                }
              >
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
                <FormErrorMessage>
                  <FormErrorIcon />
                  Must choose a project for "Project Support" type
                </FormErrorMessage>
              </FormControl>
            </>
          )}
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
