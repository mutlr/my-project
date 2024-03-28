import React from "react";
import { FormValues  } from "./Postform";
import { Post, SongEntry } from "../../types";
import { sendComment } from "../../services/postService";
import MainForm from "./MainForm";
import { postMap } from '../../utils/utils';
interface CommentformProps {
    postId: number,
    toggleVisibility: () => void,
    addComment: (e: Post) => void,
}

const Commentform = ({ postId, toggleVisibility, addComment }: CommentformProps) => {
    const handleSubmit = async (values: FormValues, song: SongEntry) => {
        sendComment({ ...song, title: values.title, postId, description: values.description ? values.description : '' })
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