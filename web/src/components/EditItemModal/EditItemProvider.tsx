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
import { ListItemType } from "../../features/lists/ListItemType";
import {
  List_ListType,
  List_ListTypeSupport,
} from "../../features/lists/ListType";
import { useGetProjectsQuery } from "../../features/projects/projectApi";
import { ProjectListItemType } from "../../features/projects/ProjectType";
import { useList } from "../../providers/ListProvider";

interface EditItemContextType {
  isOpen: boolean;
  title: string;
  selectedType: string;
  selectedProjectId: string;
  selectedListId: string;
  setTitle: (title: string) => void;
  setSelectedType: (title: string) => void;
  setSelectedListId: (id: string) => void;
  setSelectedProjectId: (id: string) => void;
  editItem: () => void;
  onOpen: (
    item: ProjectListItemType | ListItemType,
    type: List_ListTypeSupport
  ) => void;
  onClose: () => void;
}

const EditItemContext = createContext<EditItemContextType>(null!);

export const EditItemProvider = ({ children }: { children: ReactNode }) => {
  const { listType } = useList();

  const [updateListItem] = useUpdateListItemMutation();
  const [updateList] = useUpdateListItemListMutation();

  const { data: projects = [] } = useGetProjectsQuery();

  const [title, setTitle] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedListId, setSelectedListId] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");

  const [selectedItem, setSelectedItem] = useState<
    ProjectListItemType | ListItemType | null
  >(null);

  const [isOpen, setIsOpen] = useState(false);

  const onOpen = (
    item: ProjectListItemType | ListItemType,
    type: List_ListTypeSupport
  ) => {
    setSelectedItem(item);
    console.log(item);
    setTitle(item.title);
    if (item.list_id) {
      setSelectedType(type);
      setSelectedListId(item.list_id);
    } else {
      setSelectedType("");
    }
    if (item.project) {
      setSelectedProjectId(item.project.id);
    }
    if (item.project_id) {
      setSelectedProjectId(item.project_id);
    }

    setIsOpen(true);
  };

  const onClose = () => {
    setSelectedItem(null);
    setIsOpen(false);
  };

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
          console.log("updating");
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
          console.log("updating");
          await updateList({
            list_id: selectedItem.list_id ? selectedItem.list_id : "",
            new_list_id: newListId,
            project_id: selectedProjectId,
            id: selectedItem.id,
          }).unwrap();
        }
      }
      onClose();
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
    isOpen,
    onOpen,
    onClose,
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
