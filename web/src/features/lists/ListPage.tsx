import { Flex, Heading, List, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";

import { ItemDeleteModal } from "../../components/ItemDeleteModal";
import EditItemModal from "../../components/EditItemModal";
import { ListProvider, useList } from "../../providers/ListProvider";
import { AddListItemForm } from "./AddListItemForm";
import { ItemRow } from "./ItemRow";
import {
  useDeleteListItemMutation,
  useGetListQuery,
  useUpdateListItemMutation,
} from "./listApi";
import { ListItemType } from "./ListItemType";
import { ListContainer } from "../../components/ListContainer";
import { NeptuneList } from "../../components/NeptuneList";
import { EditItemProvider } from "../../components/EditItemModal/EditItemProvider";

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
    isFetching,
    isError,
    error,
    isSuccess,
    refetch,
  } = useGetListQuery({ id: listId });

  const [updateListItem] = useUpdateListItemMutation();
  const [deleteListItem] = useDeleteListItemMutation();

  const [selected, setSelected] = useState<ListItemType | null>(null);

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
  }, [isError, refetch, list, setListType]);

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
      </NeptuneList>
    );
  } else if (isError) {
    console.log(error);
    content = <Text>{error.toString()}</Text>;
  }

  return (
    <>
      <ListContainer>
        <Heading>{list && list.title}</Heading>
        <AddListItemForm />
        {content}
      </ListContainer>
      <ItemDeleteModal
        isOpen={showDelete}
        onDelete={handleDeleteItem}
        selected={selected}
        onClose={() => {
          setSelected(null);
          setShowDelete(false);
        }}
      />
      <EditItemModal />
    </>
  );
};
