import {
  CommentForm,
  Post,
  PostBase,
  PostFromBackend,
  SongForm,
} from "../types";
import { instance } from "./serviceUtils";

export const getPosts = async (): Promise<PostFromBackend[]> => {
  const result = await instance.get<{ posts: PostFromBackend[] }>(`/posts`);
  return result.data.posts;
};

export const sendPost = async (post: SongForm): Promise<PostFromBackend> => {
  const result = await instance.post(`/posts`, post, {});
  return result.data.post;
};

export const sendComment = async (
  comment: CommentForm,
): Promise<PostFromBackend> => {
  const result = await instance.post(`/comments`, comment, {});
  return result.data.returnComment;
};

export const getCommentsByID = async (
  id: number,
): Promise<PostFromBackend[]> => {
  const result = await instance.get<{ data: PostFromBackend[] }>(
    `/comments/${id}`,
  );
  return result.data.data;
};

export const getPostsByID = async (id: number): Promise<PostFromBackend[]> => {
  const result = await instance.get(`/posts/all/${id}`);
  return result.data.data;
};

export const deleteContentService = async (
  endpoint: string,
  id: number,
): Promise<void> => {
  await instance.delete(`/${endpoint}/${id}`, {});
};

export const editContentService = async (
  endpoint: string,
  id: number,
  content: PostBase,
): Promise<Post> => {
  const result = await instance.post<{ data: Post }>(
    `/${endpoint}/${id}`,
    content,
    {},
  );
  return result.data.data;
};
