import { Flex, Heading, List } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import { Input } from "@chakra-ui/react";

import { selectUser } from "../features/auth/authSlice";
import {
  useAddListMutation,
  useGetListsQuery,
} from "../features/lists/listApi";

export const Home = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const { data: lists = [] } = useGetListsQuery();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  return (
    <Flex w="full" maxW="xl" alignItems="center" gap={3} direction="column">
      <Heading alignSelf="start">Lists</Heading>
      <AddListForm />
      <List w="full" maxW="xl" spacing={3}>
        <Button
          mb={4}
          justifyContent="start"
          w="full"
          as={RouterLink}
          to="/inbox"
        >
          Inbox
        </Button>
        {lists.map((list) => {
          return (
            <Button justifyContent="start" w="full">
              {list.title}
            </Button>
          );
        })}
      </List>
    </Flex>
  );
};

export const AddListForm = () => {
  const [newListTitle, setNewListTitle] = useState("");
  const [addList] = useAddListMutation();

  const handleAddList = async () => {
    try {
      await addList({ title: newListTitle }).unwrap();
      setNewListTitle("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Flex direction="row" w="full" gap={2}>
      <Input
        value={newListTitle}
        placeholder="New List"
        onChange={(event: any) => setNewListTitle(event.target.value)}
      />
      <Button px={10} onClick={handleAddList}>
        Add list
      </Button>
    </Flex>
  );
};
