import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { ListItemType } from "../features/lists/ListItemType";

interface ListContextType {
  selectedItem: ListItemType | null;
  setSelectedItem: any;
  listId: string | null | undefined;
  setListId: any;
}

const ListContext = createContext<ListContextType>(null!);

export const ListProvider = ({ children }: { children: ReactNode }) => {
  const [selectedItem, setSelectedItem] = useState<ListItemType | null>(null);
  const [listId, setListId] = useState<string | null | undefined>(undefined);

  const value = {
    listId,
    setListId,
    selectedItem,
    setSelectedItem,
  };

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

export const useList = () => {
  const list = useContext(ListContext);
  if (!list) {
    throw new Error("Musst be used inside List provider");
  }
  return list;
};
