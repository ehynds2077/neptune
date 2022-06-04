import { Divider, Flex, Heading, List, ListItem } from "@chakra-ui/layout";
import { Button, Checkbox, IconButton, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import { IoMdTrash } from "react-icons/io";
import { useNavigate } from "react-router";

import { TaskDeleteModal } from "../components/TaskDeleteModal";
import { TaskEditModal } from "../components/TaskEditModal";
import { InboxItem } from "../interfaces/InboxItem";
import { useAuth } from "../providers/AuthProvider";
import { InboxProvider, useInbox } from "../providers/InboxProvider";
import { axiosAPI } from "../utils/apiUtils";

export const Home = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user) {
      navigate("/login", { replace: true });
    }
  }, [auth.user, navigate]);

  return (
    <InboxProvider>
      <TaskList />
    </InboxProvider>
  );
};

const TaskList = () => {
  const { items, getItems, addItem, deleteItem, setSelectedItem } = useInbox();

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");

  const handleCheckItem = async (item: InboxItem) => {
    const res = await axiosAPI.put(`api/inbox/${item.id}`, {
      isDone: !item.is_done,
    });

    getItems();

    console.log(res);
  };

  const handleAddInboxItem = async () => {
    await addItem(newItemTitle);
    setNewItemTitle("");
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
    await deleteItem();
    setShowDelete(false);
  };

  return (
    <>
      <Flex gap={3} direction="column" maxW="4xl" w="full" alignItems="center">
        <Heading>Inbox</Heading>
        <Flex direction="row" w="full" gap={2}>
          <Input
            value={newItemTitle}
            placeholder="New Item"
            onChange={(event: any) => setNewItemTitle(event.target.value)}
          />
          <Button px={10} onClick={handleAddInboxItem}>
            Add inbox item
          </Button>
        </Flex>
        <List spacing={0} rounded="lg" overflow="hidden" bg="blue.800" w="full">
          {items.map((item, idx) => {
            return (
              <InboxRow
                key={idx}
                onClick={handleClickItem}
                onCheck={handleCheckItem}
                onDelete={handleConfirmDelete}
                item={item}
              />
            );
          })}
        </List>
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
  const [checked, setChecked] = useState(item.is_done);

  useEffect(() => {
    setChecked(item.is_done);
  }, [item.is_done]);
  return (
    <ListItem>
      <Flex
        justifyContent="flex-start"
        rounded="none"
        variant="ghost"
        as={Button}
        w="full"
        p={0}
      >
        <Checkbox
          m={3}
          isChecked={checked}
          onChange={() => {
            setChecked((checked) => !checked);
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
