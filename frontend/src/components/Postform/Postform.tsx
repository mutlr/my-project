import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, useFormikContext } from 'formik';
import './Postform.css';
import { useDebounce } from "@uidotdev/usehooks";
import { getSongs } from '../../services/apiServices';
import { sendPost } from '../../services/postService';
import { SongEntry, Song } from '../../types';
interface FormValues {
    song: string,
    title: string
}

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
        .then(result => console.log('Result from adding post: ', result));
    };
    const addToList = (songList: Song[]) => {
        setSongs(songList);
    };
    return (
        <div className='postform-container'>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <MainForm addToList={(addToList)}/>
            </Formik>
            {songs.map(s => (
                <SongBox s={s} key={s.songId} chooseSong={chooseSong}/>
            ))}
        </div>
    );
};
interface SongProps {
    s: Song,
    chooseSong: (song: SongEntry) => void,
}

const SongBox = ({ s, chooseSong }: SongProps) => {
    const handlePress = () => {
        chooseSong({ artistName: s.artistName, songId: s.songId, artistId: s.artistId, songName: s.songName, });
    };
    return (
        <div className='song-container' onClick={handlePress}>
            <img src={s.image} className='song-image'/>
            <div className='song-description'>
                <p>{s.songName} by {s.artistName}</p>
            </div>
        </div>
    );
};

interface MainFormProps {
    addToList (list: Song[]): void
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
            <label htmlFor="title">Title</label>
            <Field type="text" className="formInput" name="title" placeholder='Title for post   ' />

            <label htmlFor="song">Song name</label>
            <Field type="text" className="formInput" name="song" placeholder='Type in 3 letter for search to start' />
            <button type="submit">Submit</button>
        </Form>
    );
};

export default Postform;
