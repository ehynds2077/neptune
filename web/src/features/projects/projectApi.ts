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

export interface UpdateProjectRequest {
  id: string;
  title: string;
}

export const projectApi = emptySplitApi.injectEndpoints({
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
      providesTags: ["Project"],
    }),

    deleteProject: builder.mutation<void, DeleteProjectRequest>({
      query: (request) => ({
        url: `/project/${request.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),

    updateProject: builder.mutation<void, UpdateProjectRequest>({
      query: (request) => ({
        url: `/project/${request.id}`,
        method: "PUT",
        body: request,
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
  useUpdateProjectMutation,
} = projectApi;
