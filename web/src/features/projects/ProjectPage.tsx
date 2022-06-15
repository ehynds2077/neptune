import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  List,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import { IoMdTrash } from "react-icons/io";
import { useParams } from "react-router-dom";

import { NeptuneList } from "../../components/NeptuneList";
import { ListContainer } from "../../components/ListContainer";
import { List_ListType, listTypeDict } from "../lists/ListType";
import { useGetProjectQuery } from "./projectApi";
import { ProjectListItemType } from "./ProjectType";
import {
  useDeleteListItemMutation,
  useUpdateListItemMutation,
} from "../lists/listApi";
import { ItemDeleteModal } from "../../components/ItemDeleteModal";
import EditItemModal from "../../components/EditItemModal";

const ProjectPageContainer = () => {
  const params = useParams();
  if (params.projectId) {
    return (
      <>
        <Text></Text>
        <ProjectPage projectId={params.projectId} />
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

  const [selected, setSelected] = useState<ProjectListItemType | null>(null);

  const handleDeleteItem = async () => {
    try {
      if (selected && selected.id) {
        if (project) {
          await deleteListItem({
            project_id: project.id,
            id: selected.id,
          }).unwrap();
        }
      }
    } catch (e) {
      console.log(e);
    }
    setShowDelete(false);
  };

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleClickItem = async (item: ProjectListItemType) => {
    setShowEdit(true);
    setSelected(item);
  };

  const handleConfirmDelete = async (item: ProjectListItemType) => {
    setShowDelete(true);
    setSelected(item);
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
        selected={selected}
        onClose={() => {
          setSelected(null);
          setShowDelete(false);
        }}
      />
      {/* <ItemEditModal
        isOpen={showEdit}
        onClose={() => {
          setSelected(null);
          setShowEdit(false);
        }}
      /> */}
    </ListContainer>
  );
};

export const ProjectItemRow = ({
  item,
  listType,
  onClick,
  onCheck,
  onDelete,
}: {
  item: ProjectListItemType;
  listType: List_ListType;
  onClick: (item: ProjectListItemType) => Promise<void>;
  onCheck: (item: ProjectListItemType) => Promise<void>;
  onDelete: (item: ProjectListItemType) => Promise<void>;
}) => {
  return (
    <ListItem>
      <Flex
        justifyContent="flex-start"
        rounded="none"
        variant="ghost"
        _hover={{ _light: { bg: "gray.400" } }}
        as={Button}
        w="full"
        p={0}
      >
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
        <Button
          bg="transparent"
          justifyContent="flex-start"
          rounded="none"
          _hover={{ bg: "transparent" }}
          _selection={{ bg: "transparent" }}
          _pressed={{ bg: "transparent" }}
          onClick={() => onClick(item)}
          w="full"
        >
          <HStack w="full" justifyContent="space-between">
            <Text>{item.title}</Text>
            {item.list_title && (
              <HStack justifySelf="end">
                <Text color="gray.400">List: </Text>
                <Text>{item.list_title}</Text>
              </HStack>
            )}
          </HStack>
        </Button>

        <IconButton
          variant="ghost"
          onClick={() => {
            onDelete(item);
          }}
          aria-label="Delete Item"
          icon={<IoMdTrash />}
        />
      </Flex>
      <Divider color="white" />
    </ListItem>
  );
};

export default ProjectPageContainer;
