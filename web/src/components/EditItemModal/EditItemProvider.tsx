import React, { createContext, ReactNode, useContext, useState } from "react";

import { useUpdateListItemMutation } from "../../features/lists/listApi";
import { ListItemType } from "../../features/lists/ListItemType";
import { List_ListTypeSupport } from "../../features/lists/ListType";
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
  onOpen: (item: ListItemType, type: List_ListTypeSupport) => void;
  onClose: () => void;
}

const EditItemContext = createContext<EditItemContextType>(null!);

export const EditItemProvider = ({ children }: { children: ReactNode }) => {
  const { listType } = useList();

  const [updateListItem] = useUpdateListItemMutation();

  const [title, setTitle] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedListId, setSelectedListId] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");

  const [selectedItem, setSelectedItem] = useState<ListItemType | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const resetFields = () => {
    setTitle("");
    setSelectedType("");
    setSelectedListId("");
    setSelectedProjectId("");
  };

  const onOpen = (item: ListItemType, type: List_ListTypeSupport) => {
    resetFields();
    setSelectedItem(item);
    console.log(item);
    setTitle(item.title);
    if (item.list_id) {
      setSelectedType(type);
      setSelectedListId(item.list_id);
    } else {
      setSelectedType("");
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

  const editItem = async () => {
    try {
      if (selectedItem) {
        if (
          title !== selectedItem.title ||
          selectedType !== listType ||
          selectedListId !== selectedItem.list_id ||
          selectedProjectId !== selectedItem.project_id
        ) {
          const newListId =
            selectedType !== ""
              ? selectedType !== "PROJECT_SUPPORT"
                ? selectedListId
                : "PROJECT_SUPPORT"
              : "";
          console.log("heree");
          console.log(selectedType);
          console.log(selectedListId);
          await updateListItem({
            id: selectedItem.id,
            list_id: selectedItem.list_id,
            new_list_id: newListId,
            new_project_id: selectedProjectId,
            title,
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
