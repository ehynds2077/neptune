import { useEditItem } from "./EditItemProvider";
import { FormLabel } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

export const TitleInputForm = () => {
  const { title, setTitle } = useEditItem();
  return (
    <>
      <FormLabel>Title</FormLabel>
      <Input
        mb={4}
        value={title}
        onChange={(event: any) => {
          setTitle(event.target.value);
        }}
        placeholder="Item title"
      />
    </>
  );
};
