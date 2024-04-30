import { Post } from "../types";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const postMap = (base: any): Post => {
  return {
    title: base.title,
    description: base.description,
    createdAt: base.createdAt,
    user: {
      username: base.user.username,
      id: base.user.id,
    },
    song: {
      songName: base.song.songName,
      songId: base.song.id,
      imageUrl: base.song.imageUrl,
    },
    artist: {
      artistName: base.song.artist.artistName,
      artistId: base.song.artist.id,
    },
    id: base.id,
    postIdInComment: base.postId,
  };
};
