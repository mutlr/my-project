import axios from "axios";
import { SongEntry, CommentEntry } from "../types";
import { userToken, baseUrl } from "./serviceUtils";
export const getPosts = async () => {
    const result = await axios.get(`${baseUrl}/posts`);
    return result.data.posts;
};

export const sendPost = async (post: SongEntry) => {
    const result = await axios.post(`${baseUrl}/posts`, post, {
        headers: {
            'Authorization': userToken,
        }
    });
    return result;
};

export const sendComment = async (comment: CommentEntry) => {
    const result = await axios.post(`${baseUrl}/posts/comment`, comment, {
        headers: {
            'Authorization': userToken,
        }
    });
    return result;
};