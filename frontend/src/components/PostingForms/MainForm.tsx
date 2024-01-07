import { Field, Form, useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { SongListing } from '../../types';
import { useDebounce } from "@uidotdev/usehooks";
import { getSongs } from '../../services/apiServices';
import Button from '../Button/Button';
interface MainFormProps {
    addToList (list: SongListing[]): void,
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
           props.addToList(result.filter((f: any) => f.preview_url !== null).map((r: any): SongListing => {
            return {
                song: {
                    songName: r.name,
                    songId: r.id,
                },
                artist: {
                    artistName: r.artists[0].name,
                    artistId: r.artists[0].id,
                },
                image: r.album.images[0].url
            };
            }).slice(0, 8));
        });
    }, [debouncedSearchTerm]);

    return (
        <Form className="post-form">
            <div className='input-container'>
                <label htmlFor="title">{props.title}</label>
                <Field type="text" className="formInput" name="title" placeholder='Title for post' />
            </div>

            <div className='input-container'>
                <label htmlFor="song">Description</label>
                <Field type="text" as='textarea' className="formInput textarea" name="description" placeholder='Description' />
            </div>

            <div className='input-container'>
                <label htmlFor="song">Song name</label>
                <Field type="text" className="formInput" name="song" placeholder='Type in 3 letter for search to start' />
                <Button type='submit' text='Submit' color='primary' />
            </div>
        </Form>
    );
};

export default MainForm;