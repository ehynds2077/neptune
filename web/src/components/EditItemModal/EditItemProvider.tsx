import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  useGetListsQuery,
  useUpdateListItemListMutation,
  useUpdateListItemMutation,
} from "../../features/lists/listApi";
import { useGetProjectsQuery } from "../../features/projects/projectApi";
import { useList } from "../../providers/ListProvider";

interface EditItemContextType {
  title: string;
  selectedType: string;
  selectedProjectId: string;
  selectedListId: string;
  setTitle: (title: string) => void;
  setSelectedType: (title: string) => void;
  setSelectedListId: (id: string) => void;
  setSelectedProjectId: (id: string) => void;
  editItem: () => void;
}

const EditItemContext = createContext<EditItemContextType>(null!);

export const EditItemProvider = ({ children }: { children: ReactNode }) => {
  const { selectedItem, listType } = useList();

  const [updateListItem] = useUpdateListItemMutation();
  const [updateList] = useUpdateListItemListMutation();

  const { data: projects = [] } = useGetProjectsQuery();

  const [title, setTitle] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedListId, setSelectedListId] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");

  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title);
      if (selectedItem.list_id) {
        setSelectedListId(selectedItem.list_id);
      }
      setSelectedProjectId("");
      if (selectedItem.project) {
        setSelectedProjectId(selectedItem.project.id);
      }
      if (selectedItem.list_id) {
        console.log(listType);
        setSelectedType(listType);
      } else {
        setSelectedType("");
      }
    }
  }, [selectedItem, listType]);

  const projectId = () => {
    if (selectedItem && selectedItem.project) {
      return selectedItem.project.id;
    } else {
      return "";
    }
  };

  const editItem = async () => {
    try {
      if (selectedItem) {
        if (title !== selectedItem.title || selectedProjectId !== projectId()) {
          const project = projects.find(
            (project) => project.id === selectedProjectId
          );
          await updateListItem({
            list_id: selectedItem.list_id,
            id: selectedItem.id,
            project_id: selectedProjectId,
            project,
            title,
          }).unwrap();
        }
        if (
          selectedListId !== selectedItem.list_id ||
          selectedType !== listType
        ) {
          const newListId =
            selectedType !== ""
              ? selectedType !== "PROJECT_SUPPORT"
                ? selectedListId
                : "PROJECT_SUPPORT"
              : "";
          if (selectedItem.list_id) {
            await updateList({
              list_id: selectedItem.list_id,
              new_list_id: newListId,
              project_id: selectedProjectId,
              id: selectedItem.id,
            }).unwrap();
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const value = {
    title,
    selectedType,
    selectedListId,
    selectedProjectId,
    setTitle,
    setSelectedType,
    setSelectedListId,
    setSelectedProjectId,
    editItem,
  };

  return (
    <EditItemContext.Provider value={value}>
      {children}
    </EditItemContext.Provider>
  );
};

export const useEditItem = () => {
  const edit = useContext(EditItemContext);
  if (!edit) {
    throw new Error("Must be used inside EditItemProvider");
  }
  return edit;
};
