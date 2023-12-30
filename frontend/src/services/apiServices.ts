import axios from 'axios';

export const api = "BQBA3TCkuN2PY-faUbHwBpRmndDdjhqKZCpW3xHS9PKm3kGhfEjZPK-jJaYQ3-RxAkazJMsqna1MbPzYoxbk9OzKqaSK_IBNGBILZWZmJn_Cd02sGTI";

export const getSongs = async (name: string) => {
    const result = await axios.get(`https://api.spotify.com/v1/search?q=${name}&type=track&limit=5`, {
        headers: {
            'Authorization': `Bearer ${api}`
        }
    });
    console.log('Result from api: ', result);
    return result.data.tracks.items;
};