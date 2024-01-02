import axios from 'axios';

export const api = "BQDfqtQtK4SQKHPRmRFxrqqmlnsrDXqvyHWDHlnLxMI2PYFCmTFOhJ2yo5QutA7ZeJpLLNWZJFIb4hgsg8f-s4JN68gWOgRhYeVQbgRs7fC0sn4uNq4";

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