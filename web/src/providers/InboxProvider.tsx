import React, { createContext, ReactNode, useEffect, useState } from "react";

import { InboxItem } from "../features/inbox/InboxItem";
import { axiosAPI } from "../utils/apiUtils";

interface InboxContextType {
  items: InboxItem[];
  selectedItem: InboxItem | null;
  setSelectedItem: any;
  addItem: (title: string) => Promise<void>;
  completeItem: (id: string, done: boolean) => Promise<void>;
  getItems: any;
  deleteItem: () => Promise<void>;
  // user: any;
  // login: (email: string, password: string) => Promise<boolean>;
  // register: (name: string, email: string, password: string) => Promise<boolean>;
  // logout: () => Promise<void>;
}

const InboxContext = createContext<InboxContextType>(null!);

export const InboxProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<any>(null);
  const [items, setItems] = useState<InboxItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<InboxItem | null>(null);

  useEffect(() => {
    console.log("nice");
    // getItems();
  }, []);

  const getItems = async () => {
    const res = await axiosAPI.get("/api/inbox");
    if (res.status === 200) {
      const items = res.data.inbox;
      setItems(items);
      console.log(items);
    }
  };

  const completeItem = async (id: string, done: boolean) => {
    const res = await axiosAPI.put(`api/inbox/${id}`, {
      isDone: done,
    });
  };

  const addItem = async (title: string) => {
    const res = await axiosAPI.post("/api/inbox", { title });

    console.log(res);

    if (res.status === 200) {
      const newItem = res.data;
      setItems((items) => [...items, newItem]);
    }
  };

  const deleteItem = async () => {
    if (!selectedItem) {
      return;
    }

    const res = await axiosAPI.delete(`/api/inbox/${selectedItem.id}`);

    console.log(res);

    if (res.status === 200) {
      setItems((items) => items.filter((item) => item.id !== selectedItem.id));
    }
  };

  const value = {
    items,
    selectedItem,
    completeItem,
    deleteItem,
    getItems,
    setSelectedItem,
    addItem,
  };
  return (
    <InboxContext.Provider value={value}>{children}</InboxContext.Provider>
  );
};

export const useInbox = () => {
  const auth = React.useContext(InboxContext);
  if (!auth) {
    throw new Error("Must be used inside inbox provider");
  }
  return auth;
};
