import axios from 'axios';

export const api = "BQAqdR1pKXnYJ0rtVUiar4AAw497hQPiG64-ebBVFBKFZtXIc_vrczqgUvkdWOmvaQrOvvfbUUz3Fg2waKKrm-pehLOH52MzvvhSTIszLWDwnPRzcto";

export const getSongs = async (name: string) => {
    const result = await axios.get(`https://api.spotify.com/v1/search?q=${name}&type=track&limit=5`, {
        headers: {
            'Authorization': `Bearer ${api}`
        }
    });
    console.log('Result from api: ', result);
    return result.data.tracks.items;
};