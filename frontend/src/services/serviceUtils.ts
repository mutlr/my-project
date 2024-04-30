export let userToken = "";
export const baseUrl = "/api";

export const setToken = (token: string) => {
  userToken = `Bearer ${token}`;
};
