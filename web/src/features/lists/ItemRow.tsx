import { CheckIcon } from "@chakra-ui/icons";
import {
  Center,
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
        <HStack spacing={0} alignItems="stretch" w="full">
          {listType !== "REFERENCE" && listType !== "PROJECT_SUPPORT" && (
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
      alignSelf="center"
      as={motion.div}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.2 }}
      transition=" 0.1s ease"
      m={2}
      mt={3}
      borderWidth={2}
      borderColor="gray.200"
      _light={{ borderColor: "gray.800", color: "white" }}
      rounded="full"
      bg={isChecked ? "blue.600" : "transparent"}
      h="8"
      minW="8"
      cursor="pointer"
      onClick={onCheck}
    >
      {isChecked && <CheckIcon />}
    </Center>
  );
};
