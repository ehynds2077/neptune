import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";

import EditItemModal from "../../components/EditItemModal";
import { EditItemProvider } from "../../components/EditItemModal/EditItemProvider";
import { ItemDeleteModal } from "../../components/ItemDeleteModal";
import { ListContainer } from "../../components/ListContainer";
import { NeptuneList } from "../../components/NeptuneList";
import { ListProvider, useList } from "../../providers/ListProvider";
import { ItemRow } from "../lists/ItemRow";
import {
  useAddListItemMutation,
  useDeleteListItemMutation,
  useUpdateListItemMutation,
} from "../lists/listApi";
import { ListItemType } from "../lists/ListItemType";
import { listTypeDict } from "../lists/ListType";
import { useGetProjectQuery } from "./projectApi";
import { IoMdAddCircle } from "react-icons/io";

const ProjectPageContainer = () => {
  const params = useParams();
  if (params.projectId) {
    return (
      <>
        <ListProvider>
          <EditItemProvider>
            <Text></Text>
            <ProjectPage projectId={params.projectId} />
          </EditItemProvider>
        </ListProvider>
      </>
    );
  } else {
    return <Text>Must provide id</Text>;
  }
};

const ProjectPage = ({ projectId }: { projectId: string }) => {
  const { data: project } = useGetProjectQuery({ id: projectId });

  const [updateListItem] = useUpdateListItemMutation();
  const [deleteListItem] = useDeleteListItemMutation();

  const { selectedItem, setSelectedItem } = useList();

  const handleDeleteItem = async () => {
    try {
      if (selectedItem && selectedItem.id) {
        if (project) {
          await deleteListItem({
            project_id: project.id,
            id: selectedItem.id,
          }).unwrap();
        }
      }
    } catch (e) {
      console.log(e);
    }
    setShowDelete(false);
  };

  const [showDelete, setShowDelete] = useState(false);

  const handleConfirmDelete = async (item: ListItemType) => {
    setShowDelete(true);
    setSelectedItem(item);
  };
  const handleCheckItem = async (item: ListItemType) => {
    try {
      if (project) {
        await updateListItem({
          project_id: project.id,
          id: item.id,
          is_done: !item.is_done,
        }).unwrap();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ListContainer>
      <Heading>{project && project.title}</Heading>
      <NeptuneList>
        <Tabs m={5}>
          <TabList>
            {project &&
              project.items &&
              Object.keys(listTypeDict).map((itemType, idx) => {
                return (
                  <Tab _focus={{ boxShadow: "none" }} key={idx}>
                    {listTypeDict[itemType]}
                  </Tab>
                );
              })}
          </TabList>
          <TabPanels>
            {project &&
              project.items &&
              Object.keys(listTypeDict).map((itemType, idx) => {
                return (
                  <TabPanel key={idx} px={0}>
                    {project.items
                      .filter((item) => item.list_type === itemType)
                      .map((item, idx) => {
                        return (
                          <ItemRow
                            item={item}
                            key={idx}
                            showList={true}
                            showProject={false}
                            listType={item.list_type ?? ""}
                            onCheck={handleCheckItem}
                            onDelete={handleConfirmDelete}
                          />
                        );
                      })}
                    <AddItemRow type={itemType} projectId={project.id} />
                  </TabPanel>
                );
              })}
          </TabPanels>
        </Tabs>
      </NeptuneList>
      <ItemDeleteModal
        isOpen={showDelete}
        onDelete={handleDeleteItem}
        selected={selectedItem}
        onClose={() => {
          setSelectedItem(null);
          setShowDelete(false);
        }}
      />
      <EditItemModal />
    </ListContainer>
  );
};

const AddItemRow = ({
  type,
  projectId,
}: {
  type: string;
  projectId: string;
}) => {
  const [expand, setExpand] = useState(false);
  const [title, setTitle] = useState("");
  const [addItem] = useAddListItemMutation();

  const handleCancel = () => {
    setExpand(false);
    setTitle("");
  };

  const handleDone = async () => {
    try {
      await addItem({ title, list_id: type, project_id: projectId }).unwrap();
    } catch (e) {
    } finally {
      setExpand(false);
      setTitle("");
    }
  };

  if (expand) {
    return (
      <ListItem>
        <Flex
          justifyContent="flex-start"
          rounded="md"
          _hover={{
            _light: { bg: "gray.200" },
            _dark: { bg: "gray.700" },
          }}
          _light={{ bg: "gray.200" }}
          _dark={{ bg: "gray.700" }}
          w="full"
          p={2}
          pr={4}
          my={2}
        >
          <HStack
            spacing={2}
            alignItems="center"
            w="full"
            _hover={{
              cursor: "pointer",
            }}
          >
            <IconButton
              variant="ghost"
              aria-label="Add new item"
              _hover={{ bg: "transparent" }}
              icon={<IoMdAddCircle />}
            />

            <HStack w="full" alignItems="center" justifyContent="space-between">
              <VStack p={3} w="full" alignItems="start">
                <Input
                  autoFocus
                  value={title}
                  placeholder="Enter new item here..."
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </VStack>
              <Button onClick={handleCancel} colorScheme="red">
                Cancel
              </Button>
              <Button onClick={handleDone} colorScheme="blue">
                Done
              </Button>
            </HStack>
          </HStack>
        </Flex>
      </ListItem>
    );
  } else {
    return (
      <ListItem>
        <Flex
          justifyContent="flex-start"
          rounded="none"
          _hover={{
            _light: { bg: "gray.200" },
            _dark: { bg: "gray.700" },
          }}
          w="full"
          p={2}
          my={2}
        >
          <HStack
            spacing={2}
            alignItems="center"
            w="full"
            _hover={{
              cursor: "pointer",
            }}
            onClick={() => {
              setExpand(true);
            }}
          >
            <IconButton
              variant="ghost"
              aria-label="Add new item"
              _hover={{ bg: "transparent" }}
              icon={<IoMdAddCircle />}
            />

            <HStack w="full" alignItems="center" justifyContent="space-between">
              <VStack p={3} w="full" alignItems="start">
                <Text>Add new Item</Text>
              </VStack>
            </HStack>
          </HStack>
        </Flex>
      </ListItem>
    );
  }
};

export default ProjectPageContainer;
