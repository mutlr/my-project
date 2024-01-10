import React, { useEffect, useState, SyntheticEvent } from "react";
import { getAudio } from "../../services/apiServices";
import './Audiobar.css';

interface AudiobarProps {
    songId: string,
}

const Audiobar = ({ songId }: AudiobarProps) => {
    const [audioSrc, setAudioSrc] = useState<string>("");
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const handlePlay = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
        const allAudioElements = document.querySelectorAll('audio.audio');
        allAudioElements.forEach((element) => {
            const audio = element as HTMLAudioElement;
            if (audio !== e.currentTarget) {
                audio.pause();
            }
        });
        setIsPlaying(true);
    };

    useEffect(() => {
        getAudio(songId).then(result => {
            setAudioSrc(result);
            if (isPlaying) {
                document.querySelectorAll('audio.audio').forEach((element) => {
                    const audio = element as HTMLAudioElement;
                    audio.pause();
                });
                setIsPlaying(false);
            }
        }).catch((e) => console.log(e));

        return () => {
            document.querySelectorAll('audio.audio').forEach((element) => {
                const audio = element as HTMLAudioElement;
                audio.pause();
            });
            setIsPlaying(false);
        };
    }, [songId]);

    return (
        <div className='post-player'>
            <audio src={audioSrc} controls className="audio" onPlay={handlePlay}></audio>
        </div>
    );
};

export default Audiobar;
