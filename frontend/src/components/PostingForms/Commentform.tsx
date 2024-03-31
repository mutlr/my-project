import React from "react";
import { FormValues, Post, SongEntry } from "../../types";
import { sendComment } from "../../services/postService";
import MainForm from "./MainForm";
import { postMap } from '../../utils/utils';
interface CommentformProps {
    postId: number,
    toggleVisibility: () => void,
    addComment: (e: Post) => void,
}

const Commentform = ({ postId, toggleVisibility, addComment }: CommentformProps) => {
    const handleSubmit = async (values: FormValues, songData: SongEntry) => {
        const { songId, songName, imageUrl } = songData.song;
        const { artistId, artistName } = songData.artist;
        sendComment({ song: { songId, songName, imageUrl }, artist: { artistId, artistName }, title: values.title, postId, description: values.description ? values.description : '' })
        .then(result => {
            toggleVisibility();
            addComment(postMap(result));
        })
        .catch((error) => console.log('Error adding comment: ', error));
    };
    return (
        <MainForm handleSubmitData={handleSubmit}/>
    );
};

export default Commentform;