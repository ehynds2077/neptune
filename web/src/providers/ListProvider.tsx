import React, { createContext, ReactNode, useContext, useState } from "react";

import { ListItemType } from "../features/lists/ListItemType";
import { List_ListType } from "../features/lists/ListType";

interface ListContextType {
  selectedItem: ListItemType | null;
  setSelectedItem: any;
  setListType: any;
  listId: string | null | undefined;
  listType: "" | List_ListType;
  setListId: any;
}

const ListContext = createContext<ListContextType>(null!);

export const ListProvider = ({ children }: { children: ReactNode }) => {
  const [selectedItem, setSelectedItem] = useState<ListItemType | null>(null);
  const [listId, setListId] = useState<string | null | undefined>(undefined);
  const [listType, setListType] = useState<"" | List_ListType>("");

  const value = {
    listId,
    listType,
    setListId,
    setListType,
    selectedItem,
    setSelectedItem,
  };

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

export const useList = () => {
  const list = useContext(ListContext);
  if (!list) {
    throw new Error("Must be used inside List provider");
  }
  return list;
};
