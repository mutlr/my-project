import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';
import { baseUrl } from './serviceUtils';

export let api = '';
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
};
export const getSongs = async (name: string) => {
    console.log('Token: ', api);
    const result = await axios.get(`https://api.spotify.com/v1/search?q=${name}&type=track&limit=20`, {
        headers: {
            'Authorization': BEARER,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
    return result.data.tracks.items;
};

export const getAudio = async (songId: string) => {
    const result = await axios.get(`https://api.spotify.com/v1/tracks/${songId}`, {
        headers: {
            'Authorization': 'Bearer ' + api,
        }
    });

    return result.data.preview_url;
};

export const getUserPlaylists = async (token: string) => {
    const result = await axios.get(`${SPOTIFY_BASE_URL}/users/me`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    return result;
};