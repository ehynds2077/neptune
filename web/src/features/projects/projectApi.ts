import { emptySplitApi } from "../../api";
import { ProjectType } from "./ProjectType";

export interface NewProject {
  title: string;
}

const projectApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<ProjectType[], void>({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
      providesTags: ["Project"],
    }),

    addProject: builder.mutation<void, NewProject>({
      query: (project) => ({
        url: "/projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const { useGetProjectsQuery, useAddProjectMutation } = projectApi;
