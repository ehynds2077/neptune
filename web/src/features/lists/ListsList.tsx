import { List_ListType } from "./ListType";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { AddListModal } from "../../components/AddListModal";
import { HStack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { IoMdTrash } from "react-icons/io";
import { Link as RouterLink } from "react-router-dom";
import { ListType } from "./ListType";

import { List } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useGetListsQuery } from "./listApi";
import { Button } from "@chakra-ui/react";
import { DeleteListModal } from "./DeleteListModal";

export const ListsList = ({
  type,
  title,
  lists,
}: {
  type: List_ListType;
  title: string;
  lists: ListType[];
}) => {
  const [selectedList, setSelectedList] = useState<ListType | null>(null);

  const {
    isOpen: deleteIsOpen,
    onClose: deleteOnClose,
    onOpen: deleteOnOpen,
  } = useDisclosure();

  const handleConfirmDelete = (list: ListType) => {
    setSelectedList(list);
    deleteOnOpen();
  };

  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <List w="full" mb={8} maxW="xl" spacing={3}>
      <Text fontSize="xl" fontWeight="bold" alignSelf="start">
        {title}
      </Text>
      {lists
        .filter((list) => list.list_type === type)
        .map((list) => {
          return (
            <HStack>
              <Button
                as={RouterLink}
                to={`/list/${list.id}`}
                justifyContent="start"
                w="full"
                key={list.id}
              >
                {list.title}
              </Button>
              <IconButton
                onClick={() => {
                  handleConfirmDelete(list);
                }}
                aria-label="Delete Item"
                icon={<IoMdTrash />}
              />
            </HStack>
          );
        })}
      <Button
        onClick={() => {
          onOpen();
        }}
        w="full"
      >
        <AddIcon />
      </Button>
      <AddListModal isOpen={isOpen} onClose={onClose} listType={type} />
      <DeleteListModal
        isOpen={deleteIsOpen}
        onClose={deleteOnClose}
        selected={selectedList}
        setSelected={setSelectedList}
      />
    </List>
  );
};
