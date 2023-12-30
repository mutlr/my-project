import { Formik, Field, Form, useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { Song, SongEntry } from '../../types';
import { useDebounce } from "@uidotdev/usehooks";
import { getSongs } from '../../services/apiServices';

interface MainFormProps {
    addToList (list: Song[]): void,
    title: string
}
interface FormValues {
    song: string,
    title: string
}
const MainForm = (props: MainFormProps) => {
    const formik = useFormikContext<FormValues>();
    const debouncedSearchTerm = useDebounce(formik.values.song, 500);
    useEffect(() => {
        if (formik.values.song.length < 3) return;
        getSongs(formik.values.song).then((result: any) => {
           const songs = result.map((r: any): Song => {
            return {
                songName: r.name,
                songId: r.id,
                artistName: r.artists[0].name,
                artistId: r.artists[0].id,
                image: r.album.images[0].url
            };
            });
            props.addToList(songs);
        });
    }, [debouncedSearchTerm]);

    return (
        <Form className="post-form">
            <label htmlFor="title">{props.title}</label>
            <Field type="text" className="formInput" name="title" placeholder='Title for post   ' />

            <label htmlFor="song">Song name</label>
            <Field type="text" className="formInput" name="song" placeholder='Type in 3 letter for search to start' />
            <button type="submit">Submit</button>
        </Form>
    );
};

export default MainForm;