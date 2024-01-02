import axios from 'axios';

export const api = "BQDi8SjGRzb1u-MEGGQtD1hrFy7Xbs1pHj3MzcKsn4LMeTFuHLvsZp-wDDkwUokaHeBwbaO72JUs4SfX6gH1SAFR6lMTE8nFJ-TBFHTb7UEgeIgwb7s";

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