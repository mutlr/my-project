import axios from 'axios';

const api = "BQAHwiATK4a7WgZHweZwVyQ-qXymHlM7VVoKbSSEsPpqi251fANpUFojYXykVTEkq1Bp_RlzoZX9Sxpnh7HYY5PXMh8XsRztR6k45AHY9JEK2Wy7yhY";

export const getSongs = async (name: string) => {
    const result = await axios.get(`https://api.spotify.com/v1/search?q=${name}&type=track&limit=5`, {
        headers: {
            'Authorization': `Bearer ${api}`
        }
    });
    return result.data.tracks.items;
};