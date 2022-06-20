import {
  Button,
  HStack,
  IconButton,
  Input,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import { IoMdAddCircle } from "react-icons/io";
import { useAddListItemMutation } from "./listApi";

export const AddItemRow = ({
  type,
  projectId,
}: {
  type: string;
  projectId: string;
}) => {
  const [expand, setExpand] = useState(false);
  const [title, setTitle] = useState("");
  const [addItem] = useAddListItemMutation();

  const handleCancel = () => {
    setExpand(false);
    setTitle("");
  };

  const handleDone = async () => {
    try {
      await addItem({ title, list_id: type, project_id: projectId }).unwrap();
    } catch (e) {
    } finally {
      setExpand(false);
      setTitle("");
    }
  };

  if (expand) {
    return (
      <ListItem>
        <Flex
          justifyContent="flex-start"
          rounded="md"
          _hover={{
            _light: { bg: "gray.200" },
            _dark: { bg: "gray.700" },
          }}
          _light={{ bg: "gray.200" }}
          _dark={{ bg: "gray.700" }}
          w="full"
          p={2}
          pr={4}
          my={2}
        >
          <HStack
            spacing={2}
            alignItems="center"
            w="full"
            _hover={{
              cursor: "pointer",
            }}
          >
            <IconButton
              variant="ghost"
              aria-label="Add new item"
              _hover={{ bg: "transparent" }}
              icon={<IoMdAddCircle />}
            />

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
              <Button onClick={handleDone} colorScheme="blue">
                Done
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
          }}
          w="full"
          p={2}
          my={2}
        >
          <HStack
            spacing={2}
            alignItems="center"
            w="full"
            _hover={{
              cursor: "pointer",
            }}
            onClick={() => {
              setExpand(true);
            }}
          >
            <IconButton
              variant="ghost"
              aria-label="Add new item"
              _hover={{ bg: "transparent" }}
              icon={<IoMdAddCircle />}
            />

            <HStack w="full" alignItems="center" justifyContent="space-between">
              <VStack p={3} w="full" alignItems="start">
                <Text>Add new Item</Text>
              </VStack>
            </HStack>
          </HStack>
        </Flex>
      </ListItem>
    );
  }
};
