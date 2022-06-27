import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { showToast } from ".";

import { setUser, logoutUser } from "./features/auth/authSlice";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  // baseUrl: "//api.neptunegtd.com",
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
  } else if (result.error) {
    showToast({
      title: "Network error",
      description: "Error communicating with server",
      position: "top",
      status: "error",
    });
  }

  return result;
};

export const emptySplitApi = createApi({
  baseQuery: baseQueryReauth,
  tagTypes: ["InboxItem", "List", "ListItem", "Project"],
  endpoints: () => ({}),
});
