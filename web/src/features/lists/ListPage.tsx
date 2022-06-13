import { Flex, Heading, List, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";

import { ItemDeleteModal } from "../../components/ItemDeleteModal";
import { ItemEditModal } from "../../components/ItemEditModal";
import { ListProvider, useList } from "../../providers/ListProvider";
import { AddListItemForm } from "./AddListItemForm";
import { ItemRow } from "./ItemRow";
import {
  useDeleteListItemMutation,
  useGetListQuery,
  useUpdateListItemMutation,
} from "./listApi";
import { ListItemType } from "./ListItemType";

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
