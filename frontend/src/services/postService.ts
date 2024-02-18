import axios from "axios";
import { CommentEntry, SongForm } from "../types";
import { userToken, baseUrl } from "./serviceUtils";
export const getPosts = async () => {
    const result = await axios.get(`${baseUrl}/posts`);
    return result.data.posts;
};

export const sendPost = async (post: SongForm) => {
    const result = await axios.post(`${baseUrl}/posts`, post, {
        headers: {
            'Authorization': userToken,
        }
    });
    return result.data.post;
};

export const sendComment = async (comment: CommentEntry) => {
    const result = await axios.post(`${baseUrl}/posts/comment`, comment, {
        headers: {
            'Authorization': userToken,
        }
    });
    return result.data.returnComment;
};

export const getComments = async (id: number, type?: string) => {
    const result = await axios.get(`${baseUrl}/posts/comments/${id}?type=${type}`);
    return result.data.comments;
};

export const getPostsByID = async (id: number, type?: string) => {
    const result = await axios.get(`http://localhost:3001/posts/${id}?type=${type}`);
    return result.data.posts;
};