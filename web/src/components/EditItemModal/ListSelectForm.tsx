import { FormLabel } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { useEditItem } from "./EditItemProvider";
import { useGetListsQuery } from "../../features/lists/listApi";
import { useEffect } from "react";

export const ListSelectForm = () => {
  const { selectedListId, setSelectedListId, selectedType } = useEditItem();

  const { data: lists = [] } = useGetListsQuery();

  useEffect(() => {
    const list = lists.filter((list) => list.list_type === selectedType)[0];
    if (list && list.id) {
      setSelectedListId(list.id);
    }
  }, [selectedType, lists, setSelectedListId]);

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
            {lists
              .filter((list) => list.list_type === selectedType)
              .map((list, idx) => {
                if (list.depth > 0) {
                  return (
                    <option key={idx} value={list.id}>
                      &nbsp;&nbsp;
                      {list.title}
                    </option>
                  );
                }
                return (
                  <option key={idx} value={list.id}>
                    {list.title}
                  </option>
                );
              })}
          </Select>
        </>
      )}
    </>
  );
};
