import {
  Checkbox,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import { IoMdTrash } from "react-icons/io";
import { useParams } from "react-router-dom";

import EditItemModal from "../../components/EditItemModal";
import {
  EditItemProvider,
  useEditItem,
} from "../../components/EditItemModal/EditItemProvider";
import { ItemDeleteModal } from "../../components/ItemDeleteModal";
import { ListContainer } from "../../components/ListContainer";
import { NeptuneList } from "../../components/NeptuneList";
import { ListProvider, useList } from "../../providers/ListProvider";
import {
  useDeleteListItemMutation,
  useUpdateListItemMutation,
} from "../lists/listApi";
import { List_ListType, listTypeDict } from "../lists/ListType";
import { useGetProjectQuery } from "./projectApi";
import { ProjectListItemType } from "./ProjectType";

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

  const handleClickItem = async (item: ProjectListItemType) => {};

  const handleConfirmDelete = async (item: ProjectListItemType) => {
    setShowDelete(true);
    setSelectedItem(item);
  };
  const handleCheckItem = async (item: ProjectListItemType) => {
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
        <Tabs>
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
                          <ProjectItemRow
                            item={item}
                            key={idx}
                            listType={item.list_type}
                            onClick={handleClickItem}
                            onCheck={handleCheckItem}
                            onDelete={handleConfirmDelete}
                          />
                        );
                      })}
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

export const ProjectItemRow = ({
  item,
  listType,
  onCheck,
  onDelete,
}: {
  item: ProjectListItemType;
  listType: List_ListType;
  onClick: (item: ProjectListItemType) => Promise<void>;
  onCheck: (item: ProjectListItemType) => Promise<void>;
  onDelete: (item: ProjectListItemType) => Promise<void>;
}) => {
  const { onOpen } = useEditItem();
  return (
    <ListItem>
      <Flex
        justifyContent="flex-start"
        rounded="none"
        _hover={{
          _light: { bg: "gray.400" },
          _dark: { bg: "gray.700" },
        }}
        w="full"
        px={2}
      >
        <HStack spacing={2} alignItems="stretch" w="full">
          {listType !== "REFERENCE" && listType !== "PROJECT_SUPPORT" && (
            <Checkbox
              m={3}
              isChecked={item.is_done}
              _light={{ borderColor: "gray.600" }}
              onChange={() => {
                onCheck(item);
              }}
            />
          )}
          <HStack w="full" justifyContent="space-between">
            <VStack
              p={3}
              w="full"
              _hover={{
                cursor: "pointer",
              }}
              onClick={() => {
                onOpen(item, listType);
              }}
              alignItems="start"
            >
              <Text>{item.title}</Text>
              {item.list_title && (
                <HStack justifySelf="end">
                  <Text color="gray.400">List: </Text>
                  <Text>{item.list_title}</Text>
                </HStack>
              )}
            </VStack>
            <IconButton
              variant="ghost"
              onClick={() => {
                onDelete(item);
              }}
              aria-label="Delete Item"
              icon={<IoMdTrash />}
            />
          </HStack>
        </HStack>
      </Flex>
      <Divider color="white" />
    </ListItem>
  );
};

export default ProjectPageContainer;
