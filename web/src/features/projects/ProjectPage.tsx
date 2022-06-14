import {
  Button,
  Checkbox,
  Divider,
  Flex,
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

import { ListContainer } from "../../components/ListContainer";
import { List_ListType, listTypeDict } from "../lists/ListType";
import { useGetProjectQuery } from "./projectApi";
import { ProjectListItemType } from "./ProjectType";

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
  console.log(project);
  return (
    <ListContainer>
      <Text>{project && project.id}</Text>
      <Text>{project && project.title}</Text>
      <List
        spacing={0}
        rounded="lg"
        overflow="hidden"
        bg="gray.100"
        _dark={{ bg: "blue.800" }}
        w="full"
      >
        <Tabs>
          <TabList>
            {project &&
              project.items &&
              Object.keys(listTypeDict).map((itemType) => {
                return (
                  <Tab _focus={{ boxShadow: "none" }}>
                    {listTypeDict[itemType]}
                  </Tab>
                );
              })}
          </TabList>
          <TabPanels>
            {project &&
              project.items &&
              Object.keys(listTypeDict).map((itemType) => {
                return (
                  <TabPanel>
                    {project.items
                      .filter((item) => item.list_type === itemType)
                      .map((item, idx) => {
                        return (
                          <ProjectItemRow
                            item={item}
                            key={idx}
                            listType={item.list_type}
                            onClick={async (item) => {}}
                            onCheck={async (item) => {}}
                            onDelete={async (item) => {}}
                          />
                        );
                      })}
                  </TabPanel>
                );
              })}
          </TabPanels>
        </Tabs>
        {/* // {project &&
        //   project.items &&
        //   project.items
        //     .filter((item) => true)
        //     .map((item, idx) => {
        //       return (
        //         <ProjectItemRow
        //           item={item}
        //           key={idx}
        //           listType={item.list_type}
        //           onClick={async (item) => {}}
        //           onCheck={async (item) => {}}
        //           onDelete={async (item) => {}}
        //         />
        //       );
        //     })} */}
      </List>
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
        {listType !== "REFERENCE" && (
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
          {item.title}
        </Button>
        <Text>Item Type: {item.list_type}</Text>
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
