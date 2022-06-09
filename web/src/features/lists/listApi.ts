import { emptySplitApi } from "../../api";
import { ListItemType } from "./ListItemType";
import { ListType } from "./ListType";

interface List {
  id: string;

  title: string;
  created_at: Date;
}

export interface NewList {
  title: string;
}

export interface ListRequest {
  id: string;
}

export interface NewListItem {
  title: string;
  listId: string;
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

    getList: builder.query<ListType, ListRequest>({
      query: (listReq) => ({
        url: `/list/${listReq.id}`,
        method: "GET",
      }),
      providesTags: ["ListItem"],
    }),

    addListItem: builder.mutation<ListItemType, NewListItem>({
      query: (item) => ({
        url: `/list/${item.listId}`,
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["ListItem"],
    }),
  }),
});

export const {
  useGetListsQuery,
  useAddListMutation,
  useGetListQuery,
  useAddListItemMutation,
} = listApi;
