import { Divider, Flex, Heading, List, ListItem } from "@chakra-ui/layout";
import { Button, Checkbox, IconButton, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import { IoMdTrash } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { TaskDeleteModal } from "../components/TaskDeleteModal";
import { TaskEditModal } from "../components/TaskEditModal";
import { selectUser } from "../features/auth/authSlice";
import { AddInboxItemForm } from "../features/inbox/AddInboxItemForm";
import {
  useDeleteInboxItemMutation,
  useGetInboxItemsQuery,
  useUpdateInboxItemMutation,
} from "../features/inbox/inboxApi";
import { InboxItem } from "../features/inbox/InboxItem";
import { InboxProvider, useInbox } from "../providers/InboxProvider";

export const Home = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) {
      console.log("ooooops");
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  return (
    <InboxProvider>
      <TaskList />
    </InboxProvider>
  );
};

const TaskList = () => {
  const {
    data: items = [],
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
    refetch,
  } = useGetInboxItemsQuery();

  const [updateInboxItem] = useUpdateInboxItemMutation();
  const [deleteInboxItem] = useDeleteInboxItemMutation();

  const { deleteItem, setSelectedItem, selectedItem } = useInbox();

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (isError) {
      setTimeout(refetch, 1000);
    }
  });

  const handleCheckItem = async (item: InboxItem) => {
    try {
      await updateInboxItem({ id: item.id, is_done: !item.is_done }).unwrap();
    } catch (e) {
      console.log(e);
    }
  };

  const handleClickItem = async (item: InboxItem) => {
    setShowEdit(true);
    setSelectedItem(item);
  };

  const handleConfirmDelete = async (item: InboxItem) => {
    setShowDelete(true);
    setSelectedItem(item);
  };

  const handleDeleteItem = async () => {
    try {
      if (selectedItem && selectedItem.id) {
        await deleteInboxItem(selectedItem.id).unwrap();
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
          {items.map((item, idx) => (
            <InboxRow
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
        <Heading>Inbox</Heading>
        <AddInboxItemForm />
        {content}
      </Flex>
      <TaskDeleteModal
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
      />
    </>
  );
};

const InboxRow = ({
  item,
  onClick,
  onCheck,
  onDelete,
}: {
  item: InboxItem;
  onClick: (item: InboxItem) => Promise<void>;
  onCheck: (item: InboxItem) => Promise<void>;
  onDelete: (item: InboxItem) => Promise<void>;
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
