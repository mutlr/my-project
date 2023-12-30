import { FormValues, MainForm, MainFormProps, SongBox, SongProps,  } from "../Postform/Postform";
import { Formik } from 'formik';
import { SongEntry, Song } from "../../types";
import React, { useState } from "react";
import { sendComment } from "../../services/postService";
const initialValues: FormValues = { song: '', title: '' };

const Commentform = () => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [chosenSong, setSong] = useState<SongEntry | null>(null);
    const chooseSong = (song: SongEntry) => {
        setSong(song);
    };
    const handleSubmit = async (values: FormValues) => {
        if (!chosenSong) return;
        sendComment({ ...chosenSong, title: values.title, postId: 21 })
        .then(result => console.log('Result from adding post: ', result))
        .catch(error => console.log('ERror in submitting post: ', error.response.data));
    };
    const addToList = (songList: Song[]) => {
        setSongs(songList);
    };
    return (
        <div className='postform-container'>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <MainForm addToList={(addToList)} title="Title for your comment"/>
            </Formik>
            {songs.map(s => (
                <SongBox s={s} key={s.songId} chooseSong={chooseSong}/>
            ))}
        </div>
    );
};

export default Commentform;