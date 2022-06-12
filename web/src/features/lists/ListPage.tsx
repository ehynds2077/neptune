import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import { IoMdTrash } from "react-icons/io";
import { useParams } from "react-router-dom";

import { ItemDeleteModal } from "../../components/ItemDeleteModal";
import { ItemEditModal } from "../../components/ItemEditModal";
import { ListProvider, useList } from "../../providers/ListProvider";
import {
  useAddListItemMutation,
  useDeleteListItemMutation,
  useGetListQuery,
  useUpdateListItemMutation,
} from "./listApi";
import { ListItemType } from "./ListItemType";
import { List_ListType } from "./ListType";

export const ListPage = () => {
  const params = useParams();
  return (
    <ListProvider>
      <ItemList listId={params.listId || ""} />
    </ListProvider>
  );
};

const ItemList = ({ listId }: { listId: string }) => {
  const {
    data: list,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
    refetch,
  } = useGetListQuery({ id: listId });

  const [updateListItem] = useUpdateListItemMutation();
  const [deleteListItem] = useDeleteListItemMutation();

  const { setSelectedItem, selectedItem, setListId, setListType } = useList();

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (isError) {
      setTimeout(refetch, 1000);
    } else {
      if (list) {
        setListType(list.list_type);
        console.log(list.list_type);
      }
    }
  }, [isError, refetch, list, listId]);

  useEffect(() => {
    setListId(listId);
  }, [listId, setListId]);

  const handleClickItem = async (item: ListItemType) => {
    setShowEdit(true);
    setSelectedItem(item);
  };

  const handleConfirmDelete = async (item: ListItemType) => {
    setShowDelete(true);
    setSelectedItem(item);
  };
  const handleCheckItem = async (item: ListItemType) => {
    try {
      await updateListItem({
        listId: listId,
        id: item.id,
        is_done: !item.is_done,
      }).unwrap();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteItem = async () => {
    try {
      if (selectedItem && selectedItem.id) {
        await deleteListItem({ listId, id: selectedItem.id }).unwrap();
      }
    } catch (e) {
      console.log(e);
    }
    setShowDelete(false);
  };

  let content;

  if (isLoading) {
    content = (
      <>
        <Text>Loading...</Text>
        <Spinner />
      </>
    );
  } else if (isSuccess) {
    if (isFetching) {
      content = (
        <>
          <Text>Loading...</Text>
          <Spinner />
        </>
      );
    } else {
      content = (
        <List
          spacing={0}
          rounded="lg"
          overflow="hidden"
          bg="gray.100"
          _dark={{ bg: "blue.800" }}
          w="full"
        >
          {list.items.map((item, idx) => (
            <ItemRow
              key={idx}
              listType={list.list_type}
              onClick={handleClickItem}
              onCheck={handleCheckItem}
              onDelete={handleConfirmDelete}
              item={item}
            />
          ))}
        </List>
      );
    }
  } else if (isError) {
    console.log(error);
    content = <Text>{error.toString()}</Text>;
  }

  return (
    <>
      <Flex gap={3} direction="column" maxW="4xl" w="full" alignItems="center">
        <Heading>{list && list.title}</Heading>
        <AddListItemForm />
        {content}
      </Flex>
      <ItemDeleteModal
        isOpen={showDelete}
        onDelete={handleDeleteItem}
        onClose={() => {
          setShowDelete(false);
        }}
      />
      <ItemEditModal
        isOpen={showEdit}
        onClose={() => {
          setSelectedItem(null);
          setShowEdit(false);
        }}
      />
    </>
  );
};

export const AddListItemForm = () => {
  const [newItemTitle, setNewItemTitle] = useState("");
  const [addListItem] = useAddListItemMutation();

  const params = useParams();

  const handleAddListItem = async () => {
    try {
      await addListItem({
        title: newItemTitle,
        listId: params.listId || "",
      }).unwrap();
      setNewItemTitle("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Flex direction="row" w="full" gap={2}>
      <Input
        value={newItemTitle}
        placeholder="Item title..."
        onChange={(event: any) => setNewItemTitle(event.target.value)}
      />
      <Button px={10} onClick={handleAddListItem}>
        Add new item
      </Button>
    </Flex>
  );
};

const ItemRow = ({
  item,
  listType,
  onClick,
  onCheck,
  onDelete,
}: {
  item: ListItemType;
  listType: List_ListType;
  onClick: (item: ListItemType) => Promise<void>;
  onCheck: (item: ListItemType) => Promise<void>;
  onDelete: (item: ListItemType) => Promise<void>;
}) => {
  return (
    <ListItem>
      <Flex
        justifyContent="flex-start"
        rounded="none"
        variant="ghost"
        _hover={{ _light: { bg: "gray.400" } }}
        as={Button}
        w="full"
        p={0}
      >
        {listType !== "REFERENCE" && (
          <Checkbox
            m={3}
            isChecked={item.is_done}
            _light={{ borderColor: "gray.600" }}
            onChange={() => {
              onCheck(item);
            }}
          />
        )}
        <Button
          bg="transparent"
          justifyContent="flex-start"
          rounded="none"
          _hover={{ bg: "transparent" }}
          _selection={{ bg: "transparent" }}
          _pressed={{ bg: "transparent" }}
          onClick={() => onClick(item)}
          w="full"
        >
          {item.title}
        </Button>
        {item.project && <Text>Project: {item.project?.title}</Text>}
        <IconButton
          variant="ghost"
          onClick={() => {
            onDelete(item);
          }}
          aria-label="Delete Item"
          icon={<IoMdTrash />}
        />
      </Flex>
      <Divider color="white" />
    </ListItem>
  );
};
