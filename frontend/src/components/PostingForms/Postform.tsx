import React, { useState } from 'react';
import { Formik } from 'formik';
import './Postform.css';
import { sendPost } from '../../services/postService';
import { SongEntry, Song } from '../../types';
import SongContainer from './SongContainer';
import MainForm from './MainForm';

export interface FormValues {
    song: string,
    title: string
}
interface ChosenSongProps {
    song: SongEntry | null
}
export const ChosenSong = (props: ChosenSongProps) => {
    if (!props.song) {
        return <div>Choose a song from the list first</div>;
    }
    return (
        <div style={{ color: 'white' }}>
            Song: {props.song.songName} by {props.song.artistName}
        </div>
    );
};
const initialValues: FormValues = { song: '', title: '' };
const Postform = () => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [chosenSong, setSong] = useState<SongEntry | null>(null);
    const chooseSong = (song: SongEntry) => {
        setSong(song);
    };
    const handleSubmit = async (values: FormValues) => {
        if (!chosenSong) return;
        sendPost({ ...chosenSong, title: values.title })
        .then(result => console.log('Result from adding post: ', result))
        .catch(error => console.log('ERror in submitting post: ', error.response.data));
    };
    const addToList = (songList: Song[]) => {
        setSongs(songList);
    };
    return (
        <div className='postform-container'>
            <ChosenSong song={chosenSong} />
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <MainForm addToList={(addToList)} title='Title for your post'/>
            </Formik>
            {songs.map(s => (
                <SongContainer s={s} key={s.songId} chooseSong={chooseSong}/>
            ))}
        </div>
    );
};

export default Postform;
