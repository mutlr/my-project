import { userToken, baseUrl  } from "../utils/serviceUtils";
import axios from "axios";
import { LoginValues, RegisterFormValues, User, UserValues, } from "../types";

export const userLogin = async (values: LoginValues): Promise<UserValues> => {
    const result = await axios.post(`${baseUrl}/login`, values);
    return result.data;
};

export const userRegister = async (values: RegisterFormValues): Promise<UserValues> => {
    const result = await axios.post(`${baseUrl}/register`, values);
    return result.data;
};

export const authenticateSpotify = async (code: string): Promise<UserValues> => {
    const result = await axios.post(`${baseUrl}/spotifyapi/spotifyauthentication`,
        { code }, {
        headers: {
            'Authorization': userToken,
        }
    });
    return result.data;
};

export const refreshSpotifyToken = async () => {
    const response = await axios.post(`${baseUrl}/users/refreshtoken`, null, {
        headers: {
            'Authorization': userToken,
        }
     });
    return response;
};

export const searchUsers = async (name: string): Promise<User[]> => {
    const result = await axios.get(`${baseUrl}/users/getusers/${name}`);
    return result.data.users;
};