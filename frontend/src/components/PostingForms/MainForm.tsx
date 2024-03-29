import React, { useEffect, useState } from 'react';
import { SongEntry, SongListing } from '../../types';
import { useDebounce } from "@uidotdev/usehooks";
import { getSongs } from '../../services/apiServices';
import Button from '../Button/Button';
import axios, { isAxiosError } from 'axios';
import './Postform.css';
import { useForm } from 'react-hook-form';
import { FormValues } from './Postform';
import { Song } from '../SongDetails/SongDetails';
import CustomInput from '../CustomInputs/CustomInput';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomTextarea from '../CustomInputs/CustomTextarea';
interface MainFormProps {
    handleSubmitData: (data: FormValues, song: SongEntry) => void,
}
const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().optional(),
    song: yup.string().required(),
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
                image: r.album.images[0].url
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
            song: chosenSong.song,
            artist: chosenSong.artist
        };
        props.handleSubmitData(data, song);
        reset();
        setChosenSong(null);
        setSongs([]);
    };
    return (
        <div className='post-form-main-container'>
            {chosenSong ? <Song name={chosenSong.song.songName} artist={chosenSong.artist.artistName} imageURL={chosenSong.image}   /> : <p className={`${getFieldState('song').error ? 'postform-error' : ''}`}>Choose a song</p>}
            <form className="post-form" onSubmit={handleSubmit(sendData)}>

                <CustomInput register={register} name='title' placeholder='Title' errors={errors} />

                <CustomTextarea register={register} placeholder='Description' name='description' />

                <CustomInput register={register} name='song' placeholder='Type in 3 letters for search to start' errors={errors}/>

                <Button type='submit' text='Submit' color='primary' />
            </form>
            {songs.map(s => (
                <div key={s.song.songId} className='songs-container' onClick={() => setChosenSong(s)}>
                    <Song name={s.song.songName} artist={s.artist.artistName} imageURL={s.image}/>
                </div>
            ))}
        </div>
    );
};

export default MainForm;

