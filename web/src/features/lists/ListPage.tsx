import {
  Box,
  Button,
  Divider,
  Heading,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";

import EditItemModal from "../../components/EditItemModal";
import { EditItemProvider } from "../../components/EditItemModal/EditItemProvider";
import { DeleteItemModal } from "../../components/DeleteItemModal";
import { ListContainer } from "../../components/ListContainer";
import { MessageSpinner } from "../../components/MessageSpinner";
import { NeptuneList } from "../../components/NeptuneList";
import { ListProvider, useList } from "../../providers/ListProvider";
import { AddItemRow } from "./AddItemRow";
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
      <EditItemProvider>
        <ItemList listId={params.listId || ""} />
      </EditItemProvider>
    </ListProvider>
  );
};

const ItemList = ({ listId }: { listId: string }) => {
  const {
    data: list,
    isLoading,
    isError,
    isFetching,
    error,
    isSuccess,
    refetch,
  } = useGetListQuery({ id: listId });

  const [updateListItem] = useUpdateListItemMutation();
  const [deleteListItem] = useDeleteListItemMutation();

  const [selected, setSelected] = useState<ListItemType | null>(null);

  const { setListId, setListType } = useList();

  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (list) {
      setListType(list.list_type);
      console.log(list.list_type);
    }
  }, [list, setListType]);

  useEffect(() => {
    setListId(listId);
  }, [listId, setListId]);

  const handleConfirmDelete = async (item: ListItemType) => {
    console.log(item);
    setSelected(item);
    setShowDelete(true);
  };

  const handleCheckItem = async (item: ListItemType) => {
    console.log(item);
    try {
      await updateListItem({
        list_id: listId,
        id: item.id,
        is_done: !item.is_done,
      }).unwrap();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteItem = async () => {
    try {
      if (selected && selected.id) {
        await deleteListItem({ list_id: listId, id: selected.id }).unwrap();
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
    content = (
      <NeptuneList>
        <Heading p={4}>{list && list.title}</Heading>
        <Divider size="xl" />
        {list.items.map((item, idx) => (
          <ItemRow
            key={idx}
            listType={list.list_type}
            showList={false}
            showProject={true}
            onCheck={handleCheckItem}
            onDelete={handleConfirmDelete}
            item={item}
          />
        ))}
        <AddItemRow listId={list.id} />
      </NeptuneList>
    );
  } else if (isError) {
    console.log(error);
    if (isFetching) {
      content = (
        <VStack>
          <MessageSpinner title="Fetching data" />
        </VStack>
      );
    }
    content = (
      <VStack>
        <Heading>Network error</Heading>
        <Button onClick={refetch}>Click to retry</Button>
      </VStack>
    );
  }

  return (
    <Box minH="100%">
      <ListContainer>{content}</ListContainer>
      <DeleteItemModal
        isOpen={showDelete}
        onDelete={handleDeleteItem}
        selected={selected}
        onClose={() => {
          setSelected(null);
          setShowDelete(false);
        }}
      />
      <EditItemModal />
    </Box>
  );
};
