import { Flex, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useAddInboxItemMutation } from "./inboxApi";

export const AddInboxItemForm = () => {
  const [newItemTitle, setNewItemTitle] = useState("");
  const [addInboxItem] = useAddInboxItemMutation();

  const handleAddInboxItem = async () => {
    try {
      await addInboxItem({ title: newItemTitle }).unwrap();
      setNewItemTitle("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
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
  );
};
