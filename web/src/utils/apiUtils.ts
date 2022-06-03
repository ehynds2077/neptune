import axios from "axios";

export const axiosAPI = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});
