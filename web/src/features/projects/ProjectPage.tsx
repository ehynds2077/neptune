import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetProjectQuery } from "./projectApi";
import { Flex } from "@chakra-ui/react";

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
    <Flex direction="column">
      <Text>{project && project.id}</Text>
      <Text>{project && project.title}</Text>
    </Flex>
  );
};

export default ProjectPageContainer;
