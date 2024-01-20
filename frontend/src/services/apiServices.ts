import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';

export let api = '';
const SPOTIFY_BASE_URL ='https://api.spotify.com/v1';
const REDIRECT_URI = 'http://localhost:3000/test';
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || '';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET || '';
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    redirectUri: REDIRECT_URI,
});
const BEARER = `Bearer ${api}`;
export const initToken = async () => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
		},
		body: 'grant_type=client_credentials'
	});
	const data = await result.json();
    api = data.access_token;
    return data;
};
export const getSongs = async (name: string) => {
    const result = await axios.get(`https://api.spotify.com/v1/search?q=${name}&type=track&limit=20`, {
        headers: {
            'Authorization': BEARER,
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

export default spotifyApi;