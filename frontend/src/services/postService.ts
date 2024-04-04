import axios from "axios";
import { CommentForm, PostBase, PostFromBackend, SongForm } from "../types";
import { userToken, baseUrl } from "../utils/serviceUtils";

export const getPosts = async (): Promise<PostFromBackend[]> => {
    const result = await axios.get<{ posts: PostFromBackend[] }>(`${baseUrl}/posts`);
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

export const getCommentsByID = async (id: number): Promise<PostFromBackend[]> => {
    const result = await axios.get<{ data: PostFromBackend[] }>(`${baseUrl}/comments/${id}`);
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

export const editContentService = async (endpoint: string, id: number, content: PostBase) => {
    const result = await axios.post(`${baseUrl}/${endpoint}/${id}`, content, {
        headers: {
            'Authorization': userToken,
        },
    });
    return result;
};