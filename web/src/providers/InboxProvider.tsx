import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { InboxItem } from "../features/inbox/InboxItem";
import { ListItemType } from "../features/lists/ListItemType";

interface InboxContextType {
  selectedItem: InboxItem | null;
  setSelectedItem: any;
}

const InboxContext = createContext<InboxContextType>(null!);

export const InboxProvider = ({ children }: { children: ReactNode }) => {
  const [selectedItem, setSelectedItem] = useState<InboxItem | null>(null);

  const value = {
    selectedItem,
    setSelectedItem,
  };
  return (
    <InboxContext.Provider value={value}>{children}</InboxContext.Provider>
  );
};

export const useInbox = () => {
  const inbox = React.useContext(InboxContext);
  if (!inbox) {
    throw new Error("Must be used inside inbox provider");
  }
  return inbox;
};

/////

interface ListContextType {
  selectedItem: ListItemType | null;
  setSelectedItem: any;
}

const ListContext = createContext<ListContextType>(null!);

export const ListProvider = ({ children }: { children: ReactNode }) => {
  const [selectedItem, setSelectedItem] = useState<ListItemType | null>(null);

  const value = {
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
