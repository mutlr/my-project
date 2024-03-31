import React from 'react';
import './Postform.css';
import { sendPost } from '../../services/postService';
import { FormValues, Post, SongEntry } from '../../types';
import MainForm from './MainForm';
import { postMap } from '../../utils/utils';

interface Props {
    toggleVisibility: () => void,
    addToList: (post: Post) => void,
}
const Postform = (props: Props) => {
    const handleSubmit = async (values: FormValues, songData: SongEntry) => {
        const { songId, songName, imageUrl } = songData.song;
        const { artistId, artistName } = songData.artist;   
        console.log('Posting form: ', imageUrl, ' ja ', songData.song);
        sendPost({ song: { songId, songName, imageUrl }, artist: { artistId, artistName }, title: values.title, description: values.description ? values.description : '' })
        .then(result => {
            props.toggleVisibility();
            props.addToList(postMap(result));
        })
        .catch(error => console.log('ERror in submitting post: ', error));
    };
    return (
        <MainForm handleSubmitData={handleSubmit}/>
    );
};

export default Postform;
