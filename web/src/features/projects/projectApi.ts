import { emptySplitApi } from "../../api";
import { ProjectType } from "./ProjectType";

export interface NewProject {
  title: string;
}

export interface GetProjectRequest {
  id: string;
}

export interface DeleteProjectRequest {
  id: string;
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

    getProject: builder.query<ProjectType, GetProjectRequest>({
      query: (request) => ({
        url: `/project/${request.id}`,
        method: "GET",
      }),
    }),

    deleteProject: builder.mutation<void, DeleteProjectRequest>({
      query: (request) => ({
        url: `/project/${request.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
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

export const {
  useGetProjectQuery,
  useGetProjectsQuery,
  useAddProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
