import { FormLabel } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { useEditItem } from "./EditItemProvider";
import { listTypeDict } from "../../features/lists/ListType";
import { useEffect } from "react";

export const TypeSelectForm = () => {
  const { selectedType, setSelectedType } = useEditItem();
  useEffect(() => {}, [selectedType]);
  return (
    <>
      <FormLabel>Type</FormLabel>
      <Select
        mb={4}
        value={selectedType}
        onChange={(event: any) => {
          setSelectedType(event.target.value);
        }}
      >
        <option value="">Inbox</option>
        {Object.keys(listTypeDict).map((key, idx) => (
          <option key={idx} value={key}>
            {listTypeDict[key]}
          </option>
        ))}
      </Select>
    </>
  );
};
