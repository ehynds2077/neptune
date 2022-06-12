import { emptySplitApi } from "../../api";
import { ListItemType } from "./ListItemType";
import { List_ListType } from "./ListType";
import { ListType } from "./ListType";

export interface NewList {
  title: string;
  list_type: List_ListType;
}

export interface ListRequest {
  id?: string;
}

export interface NewListItem {
  title: string;
  listId: string;
}

export interface UpdateItemRequest {
  listId: string;
  id: string;
  projectId?: string;
}

export interface DeleteItemRequest {
  listId: string;
  id: string;
}

export interface UpdateItemListRequest {
  listId: string;
  newListId?: string;
  projectId?: string;
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
        url: item.listId === "" ? "inbox" : `/list/${item.listId}`,
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["List"],
    }),

    updateListItemList: builder.mutation<ListItemType, UpdateItemListRequest>({
      query: (request) => ({
        url: `/item/${request.id}`,
        method: "PUT",
        body: request,
      }),

      async onQueryStarted(
        { id, listId, newListId },
        { dispatch, queryFulfilled }
      ) {
        console.log(newListId);
        if (newListId) {
          const removeFromCurrent = dispatch(
            listApi.util.updateQueryData("getList", { id: listId }, (draft) => {
              const index = draft.items.findIndex((item) => item.id === id);
              if (index > -1) {
                draft.items.splice(index, 1);
              }
            })
          );

          try {
            await queryFulfilled;
          } catch (err) {
            removeFromCurrent.undo();
          }
        }
      },

      invalidatesTags: ["List", "InboxItem"],
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

      async onQueryStarted(
        { id, listId, ...updated },
        { dispatch, queryFulfilled }
      ) {
        const putResult = dispatch(
          listApi.util.updateQueryData(
            "getList",
            { id: listId ? listId : "" },
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

    deleteListItem: builder.mutation<void, DeleteItemRequest>({
      query: ({ id }) => ({
        url: `item/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted({ id, listId }, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          listApi.util.updateQueryData("getList", { id: listId }, (draft) => {
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
  useUpdateListItemMutation,
  useUpdateListItemListMutation,
  useDeleteListItemMutation,
  useGetListQuery,
  useAddListItemMutation,
} = listApi;
