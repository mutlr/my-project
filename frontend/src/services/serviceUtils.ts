import axios from "axios";
export const baseUrl = "/api";

export const instance = axios.create({
  baseURL: "/api",
});

export const setToken = (token: string): void => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
