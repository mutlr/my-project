import React, { useState } from 'react';
import { Formik } from 'formik';
import './Postform.css';
import { sendPost } from '../../services/postService';
import { SongEntry, SongListing } from '../../types';
import SongContainer from './SongContainer';
import MainForm from './MainForm';
import ChosenSong from './ChosenSong';
export interface FormValues {
    song: string,
    title: string,
    description: string,
}
interface Props {
    toggleVisibility: () => void,
}
const initialValues: FormValues = { song: '', title: '', description: '' };
const Postform = (props: Props) => {
    const [songs, setSongs] = useState<SongListing[]>([]);
    const [chosenSong, setSong] = useState<SongEntry | null>(null);
    const chooseSong = (song: SongEntry) => {
        setSong(song);
    };
    const handleSubmit = async (values: FormValues) => {
        if (!chosenSong) return;
        sendPost({ ...chosenSong, title: values.title, description: values.description })
        .then(result => {
            console.log('Result from adding post: ', result);
            props.toggleVisibility();
        })
        .catch(error => console.log('ERror in submitting post: ', error.response.data));
    };
    const addToList = (songList: SongListing[]) => {
        setSongs(songList);
    };
    return (
        <div className='postform-container'>
            <ChosenSong song={chosenSong} />
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <MainForm addToList={(addToList)} title='Title for your post'/>
            </Formik>
            {songs.map(s => (
                <SongContainer s={s} key={s.song.songId} chooseSong={chooseSong}/>
            ))}
        </div>
    );
};

export default Postform;
