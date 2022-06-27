import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Collapse,
  IconButton,
  List,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { IoPencil } from "react-icons/io5";
import { Link as RouterLink } from "react-router-dom";

import { AddListModal } from "../../components/AddListModal";
import { ExpandRow } from "../../components/ExpandRow";
import { LinkRow } from "../../components/LinkRow";
import { DeleteListModal } from "./DeleteListModal";
import { EditListModal } from "./EditListModal";
import { useGetListsQuery } from "./listApi";
import { List_ListType, ListType } from "./ListType";

export const ListsList = ({ onClose }: { onClose: () => void }) => {
  const { data: lists = [] } = useGetListsQuery();
  const [expand, setExpand] = useState(true);
  const [addOpen, setAddOpen] = useState(false);

  const ListSection = ({
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
      const hasChildren = filteredLists.some(
        (l) => l.list_parent_id === list.id
      );
      const margin = list.depth * 12;

      return (
        <>
          <LinkRow mb={3} ml={margin}>
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
              onClick={onClose}
              as={RouterLink}
              to={`/list/${list.id}`}
              p={4}
              px={hasChildren ? 0 : 4}
              justifyContent="start"
              w="full"
              key={list.id}
            >
              <Text fontSize="sm" fontWeight="bold">
                {list.title}
              </Text>
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
          </LinkRow>
          <Collapse in={expand}>
            <SubLists parentId={list.id} />
          </Collapse>
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
      <List w="full" mb={8} maxW="xl" spacing={0}>
        {root && <SubLists parentId={null} />}
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

  return (
    <>
      <ExpandRow
        title="Lists"
        buttonTitle="List"
        isExpanded={expand}
        setExpand={setExpand}
        onClick={() => setAddOpen(true)}
      />
      <Collapse in={expand}>
        <ListSection lists={lists} title="Next" type="NEXT" />
        <ListSection lists={lists} title="Waiting" type="WAITING" />
        <ListSection lists={lists} title="Someday/Maybe" type="SOMEDAY" />
        <ListSection lists={lists} title="Agendas" type="AGENDA" />
        <ListSection lists={lists} title="Reference" type="REFERENCE" />
      </Collapse>
      <AddListModal isOpen={addOpen} onClose={() => setAddOpen(false)} />
    </>
  );
};
