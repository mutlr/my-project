import axios from "axios";
import { LoginValues, RegisterFormValues, UserValues } from "../types";
import { userToken } from "./serviceUtils";
import { baseUrl } from "./serviceUtils";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || '';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET || '';
const REDIRECT_URI = 'http://localhost:3000/test';

export const userLogin = async (values: LoginValues) => {
    const result = await axios.post(`${baseUrl}/login`, values);
    return result.data;
};

export const userRegister = async (values: RegisterFormValues) => {
    const result = await axios.post(`${baseUrl}/register`, values);
    return result.data;
};

export const authenticateSpotify = async (code: string) => {
    console.log(userToken);
    console.log('Coodi funcis: ', code);
    const result = await axios.post(`${baseUrl}/spotifyapi/spotifyauthentication`,
        code, {
        headers: {
            'Authorization': userToken,
        } 
    });
    return result.data;
};

export const sendAuthentication = async (access_token: string, refresh_token: string) => {
    const tokens = {
        access_token,
        refresh_token,
    };
    const result = await axios.post(`${baseUrl}/users/authenticatespotify`,
    tokens, {
        headers: {
            'Authorization': userToken
        }
    });
    return result;
};

export const refreshSpotifyToken = async () => {
    console.log('user token: ', userToken);
    const headers = {
        'Authorization': userToken,
    };

    const response = await axios.post(`${baseUrl}/users/refreshtoken`, null, { 
        headers: {
            'Authorization': userToken,
        }
     });
    console.log('Reponse from token: ', response);
    return response;
};