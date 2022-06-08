import { Divider, Flex, Heading, List, ListItem } from "@chakra-ui/layout";
import { Button, Checkbox, IconButton, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import { IoMdTrash } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link as RouterLink } from "react-router-dom";

import { TaskDeleteModal } from "../components/TaskDeleteModal";
import { TaskEditModal } from "../components/TaskEditModal";
import { selectUser } from "../features/auth/authSlice";
import { AddInboxItemForm } from "../features/inbox/AddInboxItemForm";
import {
  useDeleteInboxItemMutation,
  useGetInboxItemsQuery,
  useUpdateInboxItemMutation,
} from "../features/inbox/inboxApi";
import { InboxItem } from "../features/inbox/InboxItem";
import { InboxProvider, useInbox } from "../providers/InboxProvider";

export const Home = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) {
      console.log("ooooops");
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  return (
    <Flex w="full" maxW="xl" alignItems="center" gap={3} direction="column">
      <Heading alignSelf="start">Lists</Heading>
      <List w="full" maxW="xl">
        <Button w="full" as={RouterLink} to="/inbox">
          Inbox
        </Button>
      </List>
    </Flex>
  );
};
