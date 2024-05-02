import { UserInfo } from "../types";
import { instance } from "./serviceUtils";

export const getSongs = async (name: string, controller: AbortController) => {
  const result = await instance.get(`/spotifyapi/songs/${name}`, {
    signal: controller?.signal,
  });
  return result.data.data;
};

export const getAudio = async (songId: string) => {
  const result = await instance.get(`/spotifyapi/audio/${songId}`);
  return result.data.data;
};

export const getUserSpotifyInfo = async (id: number): Promise<UserInfo> => {
  const result = await instance.get<UserInfo>(`/spotifyapi/info/${id}`);
  const data: UserInfo = result.data;
  return data;
};

export const getPlaylists = async (id: number) => {
  const result = await instance.get(`/spotifyapi/playlists/${id}`);
  return result.data.data;
};

export const addToPlaylist = async (songId: string) => {
  const result = await instance.post(
    `/spotifyapi/addtoplaylist`,
    { songId },
    {},
  );
  return result;
};

export const userSpotifyData = async (id: number) => {
  const result = await instance.get(`/spotifyapi/info/${id}`);
  return result.data;
};
