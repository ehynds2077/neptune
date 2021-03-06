import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useDeleteListMutation } from "./listApi";

import { ListType } from "./ListType";

export const DeleteListModal = ({
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
  const cancelRef = useRef(null);
  const [deleteList] = useDeleteListMutation();

  const handleDelete = async () => {
    try {
      if (selected && selected.id) {
        await deleteList({ id: selected.id }).unwrap();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSelected(null);
      onClose();
    }
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete List</AlertDialogHeader>
            <AlertDialogBody>
              <Text>
                Are you sure you want to delete this list? This will also delete
                all sublists. You can't undo this action.
              </Text>
              <Text
                _light={{ bg: "gray.200" }}
                bg="whiteAlpha.100"
                my={2}
                p={3}
                rounded="md"
                fontWeight="bold"
              >
                {selected && selected.title}
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" ml={3} onClick={handleDelete}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
