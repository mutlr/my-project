import axios from "axios";
import { CommentEntry, EditValues, SongForm } from "../types";
import { userToken, baseUrl } from "./serviceUtils";
export const getPosts = async () => {
    const result = await axios.get(`${baseUrl}/posts`);
    return result.data.posts;
};

export const sendPost = async (post: SongForm) => {
    console.log('User token on send post: ', userToken);
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
    const result = await axios.get(`${baseUrl}/posts/${id}?type=${type}`);
    return result.data.posts;
};

export const deletePost = async (id: number) => {
    const result = await axios.delete(`${baseUrl}/posts/${id}`, {
        headers: {
            'Authorization': userToken,
        }
    });
    return result;
};

export const deleteComment = async (id: number) => {
    const result = await axios.delete(`${baseUrl}/posts/comment/${id}`, {
        headers: {
            'Authorization': userToken,
        }
    });
    return result;
};

export const editPostOrComment = async (id: number, content: EditValues, type?: string) => {
    console.log('Conent: ', content);
    const result = await axios.post(`${baseUrl}/posts/${id}/?type=${type}`, content, {
        headers: {
            'Authorization': userToken,
        },
    });
    return result;
};