import axios from "axios";
import { CommentForm, EditValues, SongForm } from "../types";
import { userToken, baseUrl } from "../utils/serviceUtils";
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

export const sendComment = async (comment: CommentForm) => {
    const result = await axios.post(`${baseUrl}/comments`, comment, {
        headers: {
            'Authorization': userToken,
        }
    });
    return result.data.returnComment;
};

export const getCommentsByID = async (id: number) => {
    const result = await axios.get(`${baseUrl}/comments/${id}`);
    return result.data.data;
};
export const getComments = async (id: number) => {
    const result = await axios.get(`${baseUrl}/comments/all/${id}`);
    return result.data.data;
};

export const getPostsByID = async (id: number) => {
    const result = await axios.get(`${baseUrl}/posts/all/${id}`);
    return result.data.data;
};

export const deleteContentService = async (endpoint: string, id: number) => {
    const result = await axios.delete(`${baseUrl}/${endpoint}/${id}`, {
        headers: {
            'Authorization': userToken,
        }
    });
    return result;
};

export const editContentService = async (endpoint: string, id: number, content: EditValues) => {
    const result = await axios.post(`${baseUrl}/${endpoint}/${id}`, content, {
        headers: {
            'Authorization': userToken,
        },
    });
    return result;
};