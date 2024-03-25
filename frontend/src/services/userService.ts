import { userToken, baseUrl, setToken } from "../utils/serviceUtils";
import axios from "axios";
import { LoginValues, RegisterFormValues, } from "../types";

export const userLogin = async (values: LoginValues) => {
    const result = await axios.post(`${baseUrl}/login`, values);
    return result.data;
};

export const userRegister = async (values: RegisterFormValues) => {
    const result = await axios.post(`${baseUrl}/register`, values);
    return result.data;
};

export const authenticateSpotify = async (code: string) => {
    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {
        const user = JSON.parse(loggedUser);
        setToken(user.token);
    }
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

export const searchUsers = async (name: string): Promise<{ username: string, id: number }[]> => {
    const result = await axios.get(`http://localhost:3001/users/getusers/${name}`);
    return result.data.users;
};