import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { setUser, logoutUser } from "./features/auth/authSlice";

export const baseQuery = fetchBaseQuery({
  baseUrl: "neptunegtd.com:4000",
  credentials: "include",
});



const baseQueryReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const argObj = args as any;
  let result = await baseQuery(args, api, extraOptions);
  if (argObj.url === "login" || argObj.url === "register") {
    return result;
  } else if (result.error && (result.error as any).originalStatus === 401) {
    const refreshResult = await baseQuery("/refreshToken", api, extraOptions);
    if (!refreshResult.error) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logoutUser());
    }
  }

  return result;
};

export const emptySplitApi = createApi({
  baseQuery: baseQueryReauth,
  tagTypes: ["InboxItem", "List", "ListItem", "Project"],
  endpoints: () => ({}),
});
