import {
  Button,
  Checkbox,
  Divider,
  Flex,
  IconButton,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { IoMdTrash } from "react-icons/io";
import { useEditItem } from "../../components/EditItemModal/EditItemProvider";

import { ListItemType } from "./ListItemType";
import { List_ListType } from "./ListType";

export const ItemRow = ({
  item,
  listType,
  onCheck,
  onDelete,
}: {
  item: ListItemType;
  listType: List_ListType;
  onClick: (item: ListItemType) => Promise<void>;
  onCheck: (item: ListItemType) => Promise<void>;
  onDelete: (item: ListItemType) => Promise<void>;
}) => {
  const { onOpen } = useEditItem();
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
        {listType !== "REFERENCE" && (
          <Checkbox
            m={3}
            isChecked={item.is_done}
            _light={{ borderColor: "gray.600" }}
            onChange={() => {
              onCheck(item);
            }}
          />
        )}
        <Button
          bg="transparent"
          justifyContent="flex-start"
          rounded="none"
          _hover={{ bg: "transparent" }}
          _selection={{ bg: "transparent" }}
          _pressed={{ bg: "transparent" }}
          onClick={() => onOpen(item, listType)}
          w="full"
        >
          {item.title}
        </Button>
        {item.project && <Text>Project: {item.project?.title}</Text>}
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
