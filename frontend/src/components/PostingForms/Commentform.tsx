import { FormValues  } from "./Postform";
import { Formik } from 'formik';
import { SongEntry, SongListing, Comment } from "../../types";
import React, { useState } from "react";
import { sendComment } from "../../services/postService";
import SongContainer from "./SongContainer";
import MainForm from "./MainForm";
import ChosenSong from "./ChosenSong";
import { commentMap } from '../../utils/utils';
interface CommentformProps {
    postId: number,
    toggleVisibility: () => void,
    addComment: (e: Comment) => void,
}
const initialValues: FormValues = { song: '', title: '', description: '' };

const Commentform = ({ postId, toggleVisibility, addComment }: CommentformProps) => {
    const [songs, setSongs] = useState<SongListing[]>([]);
    const [chosenSong, setSong] = useState<SongEntry | null>(null);
    const chooseSong = (song: SongEntry) => {
        setSong(song);
    };
    const handleSubmit = async (values: FormValues) => {
        if (!chosenSong) return;
        sendComment({ ...chosenSong, title: values.title, postId, description: values.description })
        .then(result => {
            toggleVisibility();
            addComment(commentMap(result));
        })
        .catch((error) => console.log('Error adding comment: ', error));
    };
    const addToList = (songList: SongListing[]) => {
        setSongs(songList);
    };
    return (
        <div className='postform-container'>
            <ChosenSong song={chosenSong} />
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <MainForm addToList={(addToList)} title="Title for your comment"/>
            </Formik>
            {songs.map(s => (
                <SongContainer s={s} key={s.song.songId} chooseSong={chooseSong}/>
            ))}
        </div>
    );
};

export default Commentform;