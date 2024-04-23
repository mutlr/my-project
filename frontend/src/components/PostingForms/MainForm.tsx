import React, { useEffect, useState } from 'react';
import { FormValues, SongEntry, SongListing } from '../../types';
import { useDebounce } from "@uidotdev/usehooks";
import { getSongs } from '../../services/apiServices';
import Button from '../Button/Button';
import axios, { isAxiosError } from 'axios';
import './Postform.css';
import { useForm } from 'react-hook-form';
import { Song } from '../SongDetails/SongDetails';
import CustomInput from '../CustomInputs/CustomInput';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomTextarea from '../CustomInputs/CustomTextarea';
interface MainFormProps {
    handleSubmitData: (data: FormValues, song: SongEntry) => void,
    handleCancel: () => void,
}
const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().optional(),
    song: yup.string().required('Please choose a song'),
});

const MainForm = (props: MainFormProps) => {
    const [chosenSong, setChosenSong] = useState<SongListing | null>(null);
    const [songs, setSongs] = useState<SongListing[]>([]);
    const { register, handleSubmit, getFieldState, watch, reset, setError, formState: { errors, } } = useForm<FormValues>({ defaultValues: { song: '' }, resolver: yupResolver(schema) });
    const debouncedSearchTerm = useDebounce(watch('song'), 500);

    useEffect(() => {
        if (debouncedSearchTerm.length < 3) return;
        const controller = new AbortController();
        getSongs(debouncedSearchTerm, controller).then(result => {
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
           setSongs(result.filter((f: any) => f.preview_url !== null).map((r: any): SongListing => {
            return {
                song: {
                    songName: r.name,
                    songId: r.id,
                },
                artist: {
                    artistName: r.artists[0].name,
                    artistId: r.artists[0].id,
                },
                imageUrl: r.album.images[0].url
            };
            }).slice(0, 8));
        })
        .catch(error => {
            if (isAxiosError(error) && axios.isCancel(error)) {
                console.log('Cancelled');
            } else {
                console.log(error);
            }
        });
        return () => controller.abort();
    }, [debouncedSearchTerm]);
    const sendData = (data: FormValues) => {
        if (!chosenSong) {
            setError('song', { message: '' });
            return;
        }
        const song: SongEntry = {
            song: { ...chosenSong.song, imageUrl: chosenSong.imageUrl },
            artist: chosenSong.artist,
        };
        props.handleSubmitData(data, song);
        reset();
        setChosenSong(null);
        setSongs([]);
    };
    return (
        <div className='post-form-main-container'>
            {chosenSong ? <Song name={chosenSong.song.songName} artist={chosenSong.artist.artistName} imageURL={chosenSong.imageUrl} /> : 
                <p className={`${getFieldState('song').error ? 'postform-error' : ''}`}>Choose a song</p>}

            <form className="post-form" onSubmit={handleSubmit(sendData)}>

                <CustomInput register={register} name='title' placeholder='Title' errors={errors} />

                <CustomTextarea register={register} placeholder='Description' name='description' />

                <CustomInput register={register} name='song' placeholder='Type in 3 letters for search to start' errors={errors}/>
                <div>
                    <Button text='Cancel' color='light' onClick={props.handleCancel} />
                    <Button type='submit' text='Submit' color='light'/>
                </div>
            </form>
            {songs.map(s => (
                <div key={s.song.songId} className='songs-container' onClick={() => setChosenSong(s)}>
                    <Song name={s.song.songName} artist={s.artist.artistName} imageURL={s.imageUrl}/>
                </div>
            ))}
        </div>
    );
};

export default MainForm;

