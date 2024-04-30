import axios from "axios";
import { UserInfo } from "../types";
import { userToken } from "../utils/serviceUtils";
import { baseUrl } from "./serviceUtils";

export const getSongs = async (name: string, controller: AbortController) => {
  const result = await axios.get(`${baseUrl}/spotifyapi/songs/${name}`, {
    signal: controller?.signal,
  });
  return result.data.data;
};

export const getAudio = async (songId: string) => {
  const result = await axios.get(`${baseUrl}/spotifyapi/audio/${songId}`);
  return result.data.data;
};

export const getUserSpotifyInfo = async (id: number): Promise<UserInfo> => {
  const result = await axios.get<UserInfo>(`${baseUrl}/spotifyapi/info/${id}`);
  const data: UserInfo = result.data;
  return data;
};

export const getPlaylists = async (id: number) => {
  const result = await axios.get(`${baseUrl}/spotifyapi/playlists/${id}`);
  return result.data.data;
};

export const addToPlaylist = async (songId: string) => {
  const result = await axios.post(
    `${baseUrl}/spotifyapi/addtoplaylist`,
    { songId },
    {
      headers: {
        Authorization: userToken,
      },
    },
  );
  return result;
};

export const userSpotifyData = async (id: number) => {
  const result = await axios.get(`${baseUrl}/spotifyapi/info/${id}`);
  return result.data;
};
