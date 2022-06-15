import {
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";

import { useGetProjectsQuery } from "../../features/projects/projectApi";
import { useEditItem } from "./EditItemProvider";

export const ProjectSelectForm = () => {
  const { selectedType, selectedProjectId, setSelectedProjectId } =
    useEditItem();
  const { data: projects = [] } = useGetProjectsQuery();
  return (
    <>
      {selectedType !== "" && (
        <>
          <FormControl
            isInvalid={
              selectedType === "PROJECT_SUPPORT" && selectedProjectId === ""
            }
          >
            <FormLabel>Project</FormLabel>
            <Select
              mb={4}
              value={selectedProjectId}
              onChange={(event: any) => {
                setSelectedProjectId(event.target.value);
              }}
            >
              <option value="">None</option>
              {projects.map((project, idx) => {
                return (
                  <option key={idx} value={project.id}>
                    {project.title}
                  </option>
                );
              })}
            </Select>
            <FormErrorMessage>
              <FormErrorIcon />
              Must choose a project for "Project Support" type
            </FormErrorMessage>
          </FormControl>
        </>
      )}
    </>
  );
};
