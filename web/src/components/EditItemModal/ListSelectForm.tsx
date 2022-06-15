import { FormLabel } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { useList } from "../../providers/ListProvider";
import { useEditItem } from "./EditItemProvider";
import { useGetListsQuery } from "../../features/lists/listApi";

export const ListSelectForm = () => {
  const { listType } = useList();
  const { selectedListId, setSelectedListId, selectedType } = useEditItem();

  const { data: lists = [] } = useGetListsQuery();

  return (
    <>
      {selectedType !== "PROJECT_SUPPORT" && selectedType !== "" && (
        <>
          <FormLabel>List</FormLabel>
          <Select
            mb={4}
            value={selectedListId}
            onChange={(event: any) => {
              setSelectedListId(event.target.value);
            }}
          >
            <option value=""></option>
            {lists
              .filter((list) => list.list_type === listType)
              .map((list) => {
                return <option value={list.id}>{list.title}</option>;
              })}
          </Select>
        </>
      )}
    </>
  );
};
