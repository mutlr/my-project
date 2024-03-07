import axios from 'axios';
import { UserInfo } from '../types';
//import { baseUrl } from './serviceUtils';

/*export let api = '';
const SPOTIFY_BASE_URL ='https://api.spotify.com/v1';
const REDIRECT_URI = 'http://localhost:3000/test';
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || '';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET || '';

console.log(CLIENT_ID);
const BEARER = `${api}`;
export const initToken = async () => {
    const result = await axios.get(`${baseUrl}/token`);
    console.log(result);
    console.log('Resultti: ', result.data.data.toString());
    api = 'Bearer ' + result.data.data.toString();
    console.log('Api now: ', api);
    return result;
};*/
export const getSongs = async (name: string, controller: AbortController) => {
    const result = await axios.get(`http://localhost:3001/spotifyapi/songs/${name}`, { signal: controller?.signal });
    return result.data.data;
};

export const getAudio = async (songId: string) => {
    const result = await axios.get(`http://localhost:3001/spotifyapi/audio/${songId}`);
    return result.data.data;
};

export const getUserSpotifyInfo = async (id: number): Promise<UserInfo> => {
    const result = await axios.get<UserInfo>(`http://localhost:3001/spotifyapi/info/${id}`);
    const data: UserInfo = result.data;
    return data;
};

export const getPlaylists = async (id: number) => {
    const result = await axios.get(`http://localhost:3001/spotifyapi/playlists/${id}`);
    return result.data.data;
};