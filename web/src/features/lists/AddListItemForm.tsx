import { Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { useAddListItemMutation } from "./listApi";

export const AddListItemForm = () => {
  const [newItemTitle, setNewItemTitle] = useState("");
  const [addListItem] = useAddListItemMutation();

  const params = useParams();

  const handleAddListItem = async () => {
    try {
      await addListItem({
        title: newItemTitle,
        listId: params.listId || "",
      }).unwrap();
      setNewItemTitle("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Flex direction="row" w="full" gap={2}>
      <Input
        _light={{ borderColor: "gray.500" }}
        value={newItemTitle}
        placeholder="Item title..."
        onChange={(event: any) => setNewItemTitle(event.target.value)}
      />
      <Button px={10} onClick={handleAddListItem}>
        Add new item
      </Button>
    </Flex>
  );
};
