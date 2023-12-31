import axios from 'axios';

export const api = "BQBh1Wv6oG_iyTECIMD4NCPEFeVtAqE--zBV1ISO04m2agO9zzrBrlQEF085a8l-EweHPOTC1uh9nUsHPeXAJ-BPBArXE-wVNjvxoyO198Uv0CbA1RU";

export const getSongs = async (name: string) => {
    const result = await axios.get(`https://api.spotify.com/v1/search?q=${name}&type=track&limit=5`, {
        headers: {
            'Authorization': `Bearer ${api}`
        }
    });
    console.log('Result from api: ', result);
    return result.data.tracks.items;
};

export const getAudio = async (songId: string) => {
    const result = await axios.get(`https://api.spotify.com/v1/tracks/${songId}`, {
        headers: {
            'Authorization': 'Bearer ' + api
        }
    });
    return result.data.preview_url;
};