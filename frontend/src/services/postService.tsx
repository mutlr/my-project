import axios from "axios";
import { SongEntry } from "../types";

export const getPosts = async () => {
    const result = await axios.get('http://localhost:3001/posts');
    return result.data.posts;
};

export const sendPost = async (post: SongEntry) => {
    const result = await axios.post('http://localhost:3001/posts', post, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlVzZXJuYW1lIiwiaWQiOjEsImlhdCI6MTcwMzYzNTQ0N30.AU0L2Ff8BgnKFgTEx1KojrDgruAmYhZ9KNXnjQ9NvMg'
        }
    });
    return result;
};