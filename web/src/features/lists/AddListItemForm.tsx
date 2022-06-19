import { Button, Flex, FormControl, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { useAddListItemMutation } from "./listApi";

export const AddListItemForm = () => {
  const [newItemTitle, setNewItemTitle] = useState("");
  const [addListItem] = useAddListItemMutation();

  const params = useParams();

  const handleFormSubmit = async (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleAddListItem();
  };

  const handleAddListItem = async () => {
    try {
      await addListItem({
        title: newItemTitle,
        list_id: params.listId || "",
      }).unwrap();
      setNewItemTitle("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <FormControl
      flexDirection="row"
      display="flex"
      gap={2}
      as="form"
      onSubmit={handleFormSubmit}
    >
      <Input
        _light={{ borderColor: "gray.500" }}
        value={newItemTitle}
        placeholder="Item title..."
        onChange={(event: any) => setNewItemTitle(event.target.value)}
      />
      <Button px={10} onClick={handleAddListItem}>
        Add new item
      </Button>
    </FormControl>
  );
};
