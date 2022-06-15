import { emptySplitApi } from "../../api";
import { ListItemType } from "./ListItemType";
import { List_ListType } from "./ListType";
import { ListType } from "./ListType";
import { projectApi } from "../projects/projectApi";

export interface NewList {
  title: string;
  list_type: List_ListType;
}

export interface ListRequest {
  id?: string;
}

export interface NewListItem {
  title: string;
  list_id: string;
}

export interface UpdateItemRequest {
  list_id?: string;
  id: string;
  project_id?: string;
}

export interface DeleteItemRequest {
  list_id?: string;
  project_id?: string;
  id: string;
}

export interface DeleteListRequest {
  id: string;
}

export interface UpdateListRequest {
  id: string;
  title: string;
}

export interface UpdateItemListRequest {
  list_id: string;
  new_list_id?: string;
  project_id?: string;
  id: string;
}

const listApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getLists: builder.query<ListType[], void>({
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
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({
                type: "ListItem" as const,
                id,
              })),
              { type: "List", id: result.id },
            ]
          : [{ type: "List", id: "LIST" }],
    }),

    addListItem: builder.mutation<ListItemType, NewListItem>({
      query: (item) => ({
        url: item.list_id === "" ? "inbox" : `/list/${item.list_id}`,
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["List"],
    }),

    updateList: builder.mutation<void, UpdateListRequest>({
      query: (request) => ({
        url: `/list/${request.id}`,
        method: "PUT",
        body: request,
      }),
      invalidatesTags: ["List", "Project"],
    }),

    updateListItemList: builder.mutation<ListItemType, UpdateItemListRequest>({
      query: (request) => ({
        url: `/item/${request.id}`,
        method: "PUT",
        body: request,
      }),

      async onQueryStarted(
        { id, list_id, new_list_id },
        { dispatch, queryFulfilled }
      ) {
        console.log(new_list_id);
        if (new_list_id) {
          const removeFromCurrent = dispatch(
            listApi.util.updateQueryData(
              "getList",
              { id: list_id },
              (draft) => {
                const index = draft.items.findIndex((item) => item.id === id);
                if (index > -1) {
                  draft.items.splice(index, 1);
                }
              }
            )
          );

          try {
            await queryFulfilled;
          } catch (err) {
            removeFromCurrent.undo();
          }
        }
      },

      invalidatesTags: ["List", "Project", "InboxItem"],
    }),

    updateListItem: builder.mutation<
      ListItemType,
      UpdateItemRequest & Partial<ListItemType>
    >({
      query: (updated) => ({
        url: `/item/${updated.id}`,
        method: "PUT",
        body: updated,
      }),
      invalidatesTags: ["Project", "List", "InboxItem"],

      async onQueryStarted(
        { id, list_id, project_id, ...updated },
        { dispatch, queryFulfilled }
      ) {
        if (project_id) {
          const putResult = dispatch(
            projectApi.util.updateQueryData(
              "getProject",
              { id: project_id },
              (draft) => {
                const item = draft.items.find((item) => item.id === id);
                if (item) {
                  Object.assign(item, updated);
                }
              }
            )
          );

          try {
            await queryFulfilled;
          } catch (err) {
            putResult.undo();
          }
        }
        const putResult = dispatch(
          listApi.util.updateQueryData(
            "getList",
            { id: list_id ? list_id : "" },
            (draft) => {
              const item = draft.items.find((item) => item.id === id);
              if (item) {
                Object.assign(item, updated);
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch (err) {
          putResult.undo();
        }
      },
    }),

    deleteList: builder.mutation<void, DeleteListRequest>({
      query: ({ id }) => ({
        url: `list/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["List"],
    }),

    deleteListItem: builder.mutation<void, DeleteItemRequest>({
      query: ({ id }) => ({
        url: `item/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted({ id, list_id }, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          listApi.util.updateQueryData("getList", { id: list_id }, (draft) => {
            const index = draft.items.findIndex((item) => item.id === id);
            if (index > -1) {
              draft.items.splice(index, 1);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (err) {
          deleteResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetListsQuery,
  useAddListMutation,
  useUpdateListMutation,
  useUpdateListItemMutation,
  useUpdateListItemListMutation,
  useDeleteListItemMutation,
  useDeleteListMutation,
  useGetListQuery,
  useAddListItemMutation,
} = listApi;
