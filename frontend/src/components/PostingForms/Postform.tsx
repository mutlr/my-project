import React from 'react';
import './Postform.css';
import { sendPost } from '../../services/postService';
import { Post, SongEntry } from '../../types';
import MainForm from './MainForm';
import { postMap } from '../../utils/utils';
export interface FormValues {
    song: string,
    title: string,
    description?: string,
}
interface Props {
    toggleVisibility: () => void,
    addToList: (post: Post) => void,
}
const Postform = (props: Props) => {
    const handleSubmit = async (values: FormValues, song: SongEntry) => {
        sendPost({ ...song, title: values.title, description: values.description ? values.description : '' })
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
