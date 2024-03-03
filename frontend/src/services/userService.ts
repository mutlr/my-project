import { userToken, baseUrl, setToken } from "./serviceUtils";
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
    //await axios.post(`${baseUrl}/spotifyapi/test`, { code });
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