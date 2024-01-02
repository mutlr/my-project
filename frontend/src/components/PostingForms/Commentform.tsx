import { FormValues  } from "./Postform";
import { Formik } from 'formik';
import { SongEntry, SongListing, } from "../../types";
import React, { useState } from "react";
import { sendComment } from "../../services/postService";
import SongContainer from "./SongContainer";
import MainForm from "./MainForm";
import ChosenSong from "./ChosenSong";
interface CommentformProps {
    postId: number,
}
const initialValues: FormValues = { song: '', title: '' };

const Commentform = ({ postId }: CommentformProps) => {
    const [songs, setSongs] = useState<SongListing[]>([]);
    const [chosenSong, setSong] = useState<SongEntry | null>(null);
    const chooseSong = (song: SongEntry) => {
        setSong(song);
    };
    const handleSubmit = async (values: FormValues) => {
        if (!chosenSong) return;
        sendComment({ ...chosenSong, title: values.title, postId })
        .then(result => console.log('Result from adding post: ', result))
        .catch(error => console.log('ERror in submitting post: ', error.response.data));
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