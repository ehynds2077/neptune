import axios from "axios";

export const axiosAPI = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export const apiGet = (
  path: string,
  body: Object | undefined = undefined
) => {};

export const apiPost = (
  path: string,
  body: Object | undefined = undefined
) => {};

export const apiDelete = (
  path: string,
  body: Object | undefined = undefined
) => {};

export const apiPut = (
  path: string,
  body: Object | undefined = undefined
) => {};
