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
import { useParams } from "react-router-dom";
import { ListItemType } from "./ListItemType";
import { IoMdTrash } from "react-icons/io";
import { TaskEditModal } from "../../components/TaskEditModal";
import { TaskDeleteModal } from "../../components/TaskDeleteModal";
import { ListProvider, useList } from "../../providers/InboxProvider";
import { useAddListItemMutation, useGetListQuery } from "./listApi";

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

  // const [updateInboxItem] = useUpdateInboxItemMutation();
  // const [deleteInboxItem] = useDeleteInboxItemMutation();

  const { setSelectedItem, selectedItem } = useList();

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (isError) {
      setTimeout(refetch, 1000);
    }
  }, [isError, refetch, list, listId]);

  const handleClickItem = async (item: ListItemType) => {
    setShowEdit(true);
    setSelectedItem(item);
  };

  const handleConfirmDelete = async (item: ListItemType) => {
    setShowDelete(true);
    setSelectedItem(item);
  };
  const handleCheckItem = async (item: ListItemType) => {
    // try {
    //   await updateInboxItem({ id: item.id, is_done: !item.is_done }).unwrap();
    // } catch (e) {
    //   console.log(e);
    // }
  };

  const handleDeleteItem = async () => {
    // try {
    //   if (selectedItem && selectedItem.id) {
    //     await deleteInboxItem(selectedItem.id).unwrap();
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
    // setShowDelete(false);
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
      console.log(list.items);
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
      {/* <TaskDeleteModal
        isOpen={showDelete}
        onDelete={handleDeleteItem}
        onClose={() => {
          setShowDelete(false);
        }}
      />
      <TaskEditModal
        isOpen={showEdit}
        onClose={() => {
          setSelectedItem(null);
          setShowEdit(false);
        }}
      /> */}
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
        placeholder="New Item"
        onChange={(event: any) => setNewItemTitle(event.target.value)}
      />
      <Button px={10} onClick={handleAddListItem}>
        Add inbox item
      </Button>
    </Flex>
  );
};

const ItemRow = ({
  item,
  onClick,
  onCheck,
  onDelete,
}: {
  item: ListItemType;
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
        <Checkbox
          m={3}
          isChecked={item.is_done}
          _light={{ borderColor: "gray.600" }}
          onChange={() => {
            onCheck(item);
          }}
        />
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
