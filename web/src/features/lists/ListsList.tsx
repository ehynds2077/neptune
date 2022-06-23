import { List_ListType } from "./ListType";
import { useState } from "react";
import { Box, filter, useDisclosure } from "@chakra-ui/react";
import { AddListModal } from "../../components/AddListModal";
import { HStack } from "@chakra-ui/react";
import { AddIcon, ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
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

  const ListRow = ({ list }: { list: ListType }) => {
    const [expand, setExpand] = useState(true);
    const hasChildren = filteredLists.some((l) => l.list_parent_id === list.id);
    const margin = list.depth * 12;

    return (
      <>
        <HStack
          px={1}
          _hover={{
            _dark: { bg: "whiteAlpha.300" },
            _light: { bg: "gray.200" },
          }}
          rounded="lg"
          _light={{ bg: "gray.100" }}
          _dark={{ bg: "whiteAlpha.200" }}
          ml={margin}
        >
          {hasChildren && (
            <IconButton
              variant="ghost"
              _focus={{ boxShadow: "none" }}
              icon={expand ? <ChevronDownIcon /> : <ChevronRightIcon />}
              onClick={() => setExpand((expand) => !expand)}
              aria-label="Expand sublists"
            />
          )}
          <Box
            as={RouterLink}
            to={`/list/${list.id}`}
            p={4}
            px={hasChildren ? 0 : 4}
            justifyContent="start"
            w="full"
            key={list.id}
          >
            {list.title}
          </Box>
          {list.depth !== 0 && (
            <>
              <IconButton
                variant="ghost"
                onClick={() => {
                  handleShowEdit(list);
                }}
                aria-label="Edit List"
                icon={<IoPencil />}
              />
              <IconButton
                variant="ghost"
                onClick={() => {
                  handleConfirmDelete(list);
                }}
                aria-label="Delete List"
                icon={<IoMdTrash />}
              />
            </>
          )}
        </HStack>
        {expand && <SubLists parentId={list.id} />}
      </>
    );
  };

  const SubLists = ({ parentId }: { parentId: string | null }) => (
    <>
      {filteredLists
        .filter((list) => list.list_parent_id === parentId)
        .map((list, idx) => {
          return <ListRow list={list} key={idx} />;
        })}
    </>
  );

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
