import axios from 'axios';

export const api = "BQAYbtfWK3U8_RQw4xD-U7q-bkkw_TXq7kZoYM1UiCJh7cMBkKYZb1KuBJ1ow-RuDBsATy2NDpCLd62fQ69f_vSp3oA-1_tbpadh35_0Ou-UdSKYW5c";

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