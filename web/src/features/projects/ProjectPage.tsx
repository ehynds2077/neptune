import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
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
  useDeleteListItemMutation,
  useUpdateListItemMutation,
} from "../lists/listApi";
import { ListItemType } from "../lists/ListItemType";
import { listTypeDict } from "../lists/ListType";
import { useGetProjectQuery } from "./projectApi";
import { AddItemRow } from "../lists/AddItemRow";

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

export default ProjectPageContainer;
