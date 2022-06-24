import { emptySplitApi } from "../../api";

export interface User {
  name: string;
  email: string;
  uid: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  demo: boolean;
}

export interface Credentials {
  email: string;
  password: string;
}

const authApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<User, Credentials>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    signUp: builder.mutation<void, SignUpRequest>({
      query: (request) => ({
        url: "register",
        method: "POST",
        body: request,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useSignUpMutation, useLogoutMutation } =
  authApi;
