import axios from 'axios';

export const api = "BQAmkTrZoEcFrWX8m_XhgULmChNnKE3BBYavc7pYuVwQTBeu3YZULK0KH6Lfl3TFdUxHhYTM20v8LM8jXEZuRsUVREzahrK0Ka-QtCStaM6yHHG5CN4";

export const getSongs = async (name: string) => {
    const result = await axios.get(`https://api.spotify.com/v1/search?q=${name}&type=track&limit=20`, {
        headers: {
            'Authorization': `Bearer ${api}`
        }
    });
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