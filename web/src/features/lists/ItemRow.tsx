import {
  Checkbox,
  Divider,
  Flex,
  HStack,
  IconButton,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
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
            <Checkbox
              m={3}
              isChecked={item.is_done}
              _light={{ borderColor: "gray.600" }}
              onChange={() => {
                onCheck(item);
              }}
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
              {showList && item.list_title && (
                <HStack justifySelf="end">
                  <Text _light={{ color: "gray.600" }} color="gray.400">
                    List:{" "}
                  </Text>
                  <Text>{item.list_title}</Text>
                </HStack>
              )}
              {showProject && item.project_title && (
                <HStack justifySelf="end">
                  <Text _light={{ color: "gray.600" }} color="gray.400">
                    Project:{" "}
                  </Text>
                  <Text>{item.project_title}</Text>
                </HStack>
              )}
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
