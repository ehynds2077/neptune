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
import { IoPencil } from "react-icons/io5";

import { List } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { DeleteListModal } from "./DeleteListModal";
import { EditListModal } from "./EditListModal";

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

  const filteredLists = lists.filter((list) => list.list_type === type);
  const root = filteredLists.find((list) => !list.list_parent_id);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: editIsOpen,
    onClose: editOnClose,
    onOpen: editOnOpen,
  } = useDisclosure();
  const {
    isOpen: deleteIsOpen,
    onClose: deleteOnClose,
    onOpen: deleteOnOpen,
  } = useDisclosure();

  const handleConfirmDelete = (list: ListType) => {
    setSelectedList(list);
    deleteOnOpen();
  };

  const handleShowEdit = (list: ListType) => {
    setSelectedList(list);
    editOnOpen();
  };

  const SubLists = ({ parentId }: { parentId: string | null }) => {
    return (
      <>
        {filteredLists
          .filter((list) => list.list_parent_id === parentId)
          .map((list, idx) => {
            const margin = list.depth * 8;
            return (
              <>
                <HStack ml={margin} key={idx}>
                  <Button
                    as={RouterLink}
                    to={`/list/${list.id}`}
                    justifyContent="start"
                    w="full"
                    key={list.id}
                  >
                    {list.title}
                  </Button>
                  {list.depth !== 0 && (
                    <>
                      <IconButton
                        onClick={() => {
                          handleShowEdit(list);
                        }}
                        aria-label="Edit List"
                        icon={<IoPencil />}
                      />
                      <IconButton
                        onClick={() => {
                          handleConfirmDelete(list);
                        }}
                        aria-label="Delete List"
                        icon={<IoMdTrash />}
                      />
                    </>
                  )}
                </HStack>
                <SubLists parentId={list.id} />
              </>
            );
          })}
      </>
    );
  };

  return (
    <List w="full" mb={8} maxW="xl" spacing={3}>
      {root && <SubLists parentId={null} />}
      <Button
        onClick={() => {
          onOpen();
        }}
        w="full"
      >
        <AddIcon />
      </Button>
      <AddListModal isOpen={isOpen} onClose={onClose} listType={type} />
      <EditListModal
        isOpen={editIsOpen}
        onClose={editOnClose}
        selected={selectedList}
        setSelected={setSelectedList}
      />
      <DeleteListModal
        isOpen={deleteIsOpen}
        onClose={deleteOnClose}
        selected={selectedList}
        setSelected={setSelectedList}
      />
    </List>
  );
};
