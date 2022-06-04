import { Divider, Flex, Heading, List, ListItem } from "@chakra-ui/layout";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Modal,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router";

import { useAuth } from "../providers/AuthProvider";
import { axiosAPI } from "../utils/apiUtils";
import { InboxItem } from "../interfaces/InboxItem";
import { InboxProvider, useInbox } from "../providers/InboxProvider";

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
  const { items, getItems, addItem, setSelectedItem } = useInbox();

  const [showEdit, setShowEdit] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");

  const handleCheckItem = async (item: InboxItem) => {
    const res = await axiosAPI.put(`api/inbox/${item.id}`, {
      isDone: !item.is_done,
    });

    getItems();

    console.log(res);
  };

  const handleAddInboxItem = async () => {
    const res = await addItem(newItemTitle);
    setNewItemTitle("");
  };

  const handleClickItem = async (item: InboxItem) => {
    setShowEdit(true);
    setSelectedItem(item);
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
                item={item}
              />
            );
          })}
        </List>
      </Flex>
      <TaskEditModal
        isOpen={showEdit}
        onClose={() => {
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
}: {
  item: InboxItem;
  onClick: (item: InboxItem) => Promise<void>;
  onCheck: (item: InboxItem) => Promise<void>;
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
      </Flex>
      <Divider color="white" />
    </ListItem>
  );
};

const TaskEditModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState("");
  const { selectedItem } = useInbox();

  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title);
    }
  }, [selectedItem]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                value={title}
                onChange={(event: any) => {
                  setTitle(event.target.value);
                }}
                placeholder="Item title"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
