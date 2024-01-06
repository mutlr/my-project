import axios from "axios";
import { LoginValues, RegisterFormValues, UserValues } from "../types";
import { userToken } from "./serviceUtils";
import { baseUrl } from "./serviceUtils";
export const userLogin = async (values: LoginValues): Promise<UserValues> => {
    const result = await axios.post(`${baseUrl}/login`, values);
    return result.data;
};

export const userRegister = async (values: RegisterFormValues): Promise<UserValues> => {
    const result = await axios.post(`${baseUrl}/register`, values);
    return result.data;
};

export const authenticateSpotify = async (code: string) => {
    const response = await axios.post(`${baseUrl}/users/authenticatespotify`, { code }, {
        headers: {
            'Authorization': userToken,
        }
    });
    return response.data.tokenData;
};
export const refreshSpotifyToken = async () => {
        const response = await axios.get(`${baseUrl}/users/refreshtoken`, {
            headers: {
                'Authorization': userToken,
            }
        });
        return response;
};