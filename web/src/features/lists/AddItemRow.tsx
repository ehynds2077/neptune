import {
  Button,
  HStack,
  IconButton,
  Input,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import { IoMdAddCircle } from "react-icons/io";
import { useAddListItemMutation } from "./listApi";

export const AddItemRow = ({
  listId,
  projectId,
}: {
  listId?: string;
  projectId?: string;
}) => {
  const [expand, setExpand] = useState(false);
  const [title, setTitle] = useState("");
  const [addItem] = useAddListItemMutation();

  const handleCancel = () => {
    setExpand(false);
    setTitle("");
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleAdd();
  };

  const handleAdd = async () => {
    try {
      await addItem({
        title,
        list_id: listId ?? "",
        project_id: projectId,
      }).unwrap();
    } catch (e) {
    } finally {
      setTitle("");
    }
  };

  if (expand) {
    return (
      <ListItem>
        <Flex
          as="form"
          onSubmit={handleFormSubmit}
          justifyContent="flex-start"
          w="full"
          p={2}
          py={4}
          // p={2}
          // mr={4}
          // my={2}
        >
          <HStack
            spacing={2}
            rounded="md"
            px={2}
            _light={{ bg: "gray.200" }}
            _dark={{ bg: "gray.700" }}
            alignItems="center"
            w="full"
            _hover={{
              cursor: "pointer",
            }}
          >
            <HStack w="full" alignItems="center" justifyContent="space-between">
              <VStack p={3} w="full" alignItems="start">
                <Input
                  autoFocus
                  value={title}
                  placeholder="Enter new item here..."
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </VStack>
              <Button onClick={handleCancel} colorScheme="red">
                Cancel
              </Button>
              <Button onClick={handleAdd} colorScheme="blue">
                Add Item
              </Button>
            </HStack>
          </HStack>
        </Flex>
      </ListItem>
    );
  } else {
    return (
      <ListItem>
        <Flex
          justifyContent="flex-start"
          rounded="none"
          _hover={{
            _light: { bg: "gray.200" },
            _dark: { bg: "gray.700" },
            cursor: "pointer",
          }}
          w="full"
          p={2}
          py={4}
          onClick={() => {
            setExpand(true);
          }}
        >
          <HStack px={2} spacing={2} alignItems="center" w="full">
            <IconButton
              variant="ghost"
              aria-label="Add new item"
              _hover={{ bg: "transparent" }}
              icon={<IoMdAddCircle />}
            />

            <HStack w="full" alignItems="center" justifyContent="space-between">
              <VStack p={3} w="full" alignItems="start">
                <Text fontWeight="bold">Add new item</Text>
              </VStack>
            </HStack>
          </HStack>
        </Flex>
      </ListItem>
    );
  }
};
