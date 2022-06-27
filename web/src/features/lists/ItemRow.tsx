import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Checkbox,
  Divider,
  Flex,
  HStack,
  IconButton,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { IoMdTrash } from "react-icons/io";

import { useEditItem } from "../../components/EditItemModal/EditItemProvider";
import { ListItemType } from "./ListItemType";
import { List_ListType } from "./ListType";

export const ItemRow = ({
  item,
  listType,
  showList,
  showProject,
  onCheck,
  onDelete,
}: {
  item: ListItemType;
  listType: List_ListType;
  showProject: boolean;
  showList: boolean;
  onCheck: (item: ListItemType) => Promise<void>;
  onDelete: (item: ListItemType) => Promise<void>;
}) => {
  const { onOpen } = useEditItem();

  const ListDetail = () => (
    <HStack justifySelf="end">
      <Text _light={{ color: "gray.600" }} color="gray.400">
        List:{" "}
      </Text>
      <Text>{item.list_title}</Text>
    </HStack>
  );

  const ProjectDetail = () => (
    <HStack justifySelf="end">
      <Text _light={{ color: "gray.600" }} color="gray.400">
        Project:{" "}
      </Text>
      <Text>{item.project_title}</Text>
    </HStack>
  );

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
        px={2}
      >
        <HStack spacing={2} alignItems="stretch" w="full">
          {listType !== "REFERENCE" && listType !== "PROJECT_SUPPORT" && (
            // <Checkbox
            //   m={3}
            //   isChecked={item.is_done}
            //   _light={{ borderColor: "gray.600" }}
            //   onChange={() => {
            //     onCheck(item);
            //   }}
            // />
            <NeptuneCheckbox
              onCheck={() => {
                onCheck(item);
              }}
              isChecked={item.is_done}
            />
          )}
          <HStack w="full" justifyContent="space-between">
            <VStack
              p={3}
              w="full"
              _hover={{
                cursor: "pointer",
              }}
              onClick={() => {
                onOpen(item, listType);
              }}
              alignItems="start"
            >
              <Text overflowWrap="anywhere">{item.title}</Text>
              {showList && item.list_title && <ListDetail />}
              {showProject && item.project_title && <ProjectDetail />}
            </VStack>
            <IconButton
              variant="ghost"
              onClick={() => {
                onDelete(item);
              }}
              aria-label="Delete Item"
              icon={<IoMdTrash />}
            />
          </HStack>
        </HStack>
      </Flex>
      <Divider color="white" />
    </ListItem>
  );
};

const NeptuneCheckbox = ({
  onCheck,
  isChecked,
}: {
  onCheck: () => void;
  isChecked: boolean;
}) => {
  return (
    <Center
      as={motion.div}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.2 }}
      transition=" 0.1s ease"
      m={3}
      borderWidth={2}
      borderColor="gray.200"
      rounded="full"
      bg={isChecked ? "blue.900" : "transparent"}
      h="8"
      w="8"
      cursor="pointer"
      onClick={onCheck}
    >
      {isChecked && <CheckIcon />}
    </Center>
  );
};
