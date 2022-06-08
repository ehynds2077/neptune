import { emptySplitApi } from "../../api";

interface List {
  id: string;

  title: string;
  created_at: Date;
}

export interface NewList {
  title: string;
}

const listApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getLists: builder.query<List[], void>({
      query: () => ({
        url: "/lists",
        method: "GET",
      }),
      providesTags: ["List"],
    }),

    addList: builder.mutation<void, NewList>({
      query: (list) => ({
        url: "/list",
        method: "POST",
        body: list,
      }),
      invalidatesTags: ["List"],
    }),
  }),
});

export const { useGetListsQuery, useAddListMutation } = listApi;
