import { emptySplitApi } from "../../api";
import { InboxItem } from "./InboxItem";

interface NewInboxItem {
  title: string;
}

const inboxApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getInboxItems: builder.query<InboxItem[], void>({
      query: () => ({
        url: "/inbox",
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "InboxItem" as const, id })),
              { type: "InboxItem", id: "LIST" },
            ]
          : [{ type: "InboxItem", id: "LIST" }],
      transformResponse: (data) => {
        console.log(data);
        return (data as any).inbox;
      },
    }),
    addInboxItem: builder.mutation<InboxItem, NewInboxItem>({
      query: (item) => {
        return {
          url: "inbox",
          method: "POST",
          credentials: "include",
          body: item,
        };
      },
      invalidatesTags: [{ type: "InboxItem", id: "LIST" }],
      async onQueryStarted(item, { dispatch, queryFulfilled }) {
        const postResult = dispatch(
          inboxApi.util.updateQueryData("getInboxItems", undefined, (draft) => {
            draft.push({ is_done: false, id: "temp", ...item });
          })
        );

        try {
          await queryFulfilled;
          console.log("up in here");
        } catch (err) {
          console.log("ooops");
          postResult.undo();
        }
      },
    }),
    updateInboxItem: builder.mutation<
      void,
      Pick<InboxItem, "id"> & Partial<InboxItem>
    >({
      query: (updatedItem) => {
        return {
          url: `inbox/${updatedItem.id}`,
          method: "PUT",
          credentials: "include",
          body: updatedItem,
        };
      },

      async onQueryStarted(
        { id, ...updatedItem },
        { dispatch, queryFulfilled }
      ) {
        const putResult = dispatch(
          inboxApi.util.updateQueryData("getInboxItems", undefined, (draft) => {
            const item = draft.find((item) => item.id === id);
            if (item) {
              Object.assign(item, updatedItem);
            }
          })
        );

        try {
          await queryFulfilled;
          console.log("up in here");
        } catch (err) {
          console.log("ooops");
          putResult.undo();
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetInboxItemsQuery,
  useAddInboxItemMutation,
  useUpdateInboxItemMutation,
} = inboxApi;
