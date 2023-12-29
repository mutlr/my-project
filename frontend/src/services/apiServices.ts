import axios from 'axios';

export const api = "BQCcRdAF3XNUEGX_CjsuebhviiGo3ivlysm48vRZzshQb3GCJqfwz4ElGyVyfZZQ6LsT9MY008t1qxXbewDaNIR2VNFZQFW4XfnDtZXmFg626vZqvKU";

export const getSongs = async (name: string) => {
    const result = await axios.get(`https://api.spotify.com/v1/search?q=${name}&type=track&limit=5`, {
        headers: {
            'Authorization': `Bearer ${api}`
        }
    });
    console.log('Result from api: ', result);
    return result.data.tracks.items;
};