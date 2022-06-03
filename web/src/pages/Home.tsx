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

export interface InboxItem {
  id: string;
  title: string;
  isDone: boolean;
  notes?: string;
}

export const Home = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user) {
      navigate("/login", { replace: true });
    }
  }, [auth.user, navigate]);

  return <TaskList />;
};

const TaskList = () => {
  const auth = useAuth();
  const [items, setItems] = useState<InboxItem[]>([]);

  const [selectedItem, setSelectedItem] = useState<InboxItem | null>(null);
  const [showEdit, setShowEdit] = useState(false);

  const [newItemTitle, setNewItemTitle] = useState("");

  const getItems = async () => {
    const res = await axiosAPI.get("/api/inbox");
    if (res.status === 200) {
      const items = res.data.inbox;
      setItems(items);
      console.log(items);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleAddInboxItem = async () => {
    const res = await axiosAPI.post("/api/inbox", { title: newItemTitle });
    console.log(res);
    if (res.status === 200) {
      const newItem = res.data;
      setItems((items) => [...items, newItem]);
    }

    setNewItemTitle("");
  };

  const handleCheckItem = async (item: InboxItem) => {
    const res = await axiosAPI.put(`api/inbox/${item.id}`);
  };

  const handleClickItem = async (item: InboxItem) => {
    setShowEdit(true);
    setSelectedItem(item);
  };

  const TaskEditModal = ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) => {
    const [title, setTitle] = useState("");

    useEffect(() => {
      if (selectedItem) {
        setTitle(selectedItem.title);
      }
    });
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
                <Input value={title} placeholder="Item title" />
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
        <Checkbox m={3} onClick={() => onCheck(item)} />
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
