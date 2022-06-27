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
import { ListItemType } from "../features/lists/ListItemType";

export const ItemDeleteModal = ({
  isOpen,
  onClose,
  onDelete,
  selected,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  selected: ListItemType | null;
}) => {
  const cancelRef = useRef(null);

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete item</AlertDialogHeader>
            <AlertDialogBody>
              <Text>
                Are you sure you want to delete this item? You can't undo this
                action.
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
              <Button colorScheme="red" ml={3} onClick={onDelete}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
