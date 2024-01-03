import { BasePost, Comment, Post } from "../types";
const baseMap = (base: any): BasePost => {
    return {
        title: base.title,
        description: base.description,
        createdAt: base.createdAt,
        user: {
            username: base.user.username
        },
        song: {
            songName: base.song.songName,
            songId: base.song.id,
        },
        artist: {
            artistName: base.song.artist.artistName,
            artistId: base.song.artist.id,
        }
    };
};

export const commentMap = (comment: any): Comment => {
    return {
        ...baseMap(comment), commentId: comment.id 
    };
};

export const postMap = (post: any): Post => {
    return {
        ...baseMap(post), postId: post.id
    };
};