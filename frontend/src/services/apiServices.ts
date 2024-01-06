import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';

export let api = '';
const REDIRECT_URI = 'http://localhost:3000/test';
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
			'Authorization': 'Basic ' + btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET)
		},
		body: 'grant_type=client_credentials'
	});
	const data = await result.json();
    api = data.access_token;
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
            'Authorization': BEARER,
        }
    });

    return result.data.preview_url;
};


export default spotifyApi;