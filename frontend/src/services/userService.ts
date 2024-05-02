import { instance } from "./serviceUtils";
import { LoginValues, RegisterFormValues, User, UserValues } from "../types";

export const userLogin = async (values: LoginValues): Promise<UserValues> => {
  const result = await instance.post(`/login`, values);
  return result.data;
};

export const userRegister = async (
  values: RegisterFormValues,
): Promise<UserValues> => {
  const result = await instance.post(`/register`, values);
  return result.data;
};

export const authenticateSpotify = async (
  code: string,
): Promise<UserValues> => {
  const result = await instance.post(
    `/spotifyapi/spotifyauthentication`,
    { code },
    {},
  );
  return result.data;
};

export const searchUsers = async (name: string): Promise<User[]> => {
  const result = await instance.get(`/users/getusers/${name}`);
  return result.data.users;
};
