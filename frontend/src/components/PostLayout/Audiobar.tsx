import React, { useEffect, useState, useRef } from "react";
import { playButtonSVG, pauseButtomSVG } from "../../assets/playPauseButtons";
import { getAudio } from "../../services/apiServices";
interface AudiobarProps {
    songId: string,
}

const Audiobar = ({ songId }: AudiobarProps) => {
    const [width, setWidth] = useState<number>(0);
    const [isPlaying, setisPlaying] = useState<boolean>(false);
    const [time, setTime] = useState<number>(0);
    const audio = useRef(new Audio());

    const handleResize = () => {
        const progressBar = document.querySelector('.progressBar') as HTMLDivElement;
        if (progressBar) {
            setWidth(progressBar.clientWidth);
        }
    };

    const playSound = () => {
        isPlaying ? audio.current.pause() : audio.current.play();
        setisPlaying(!isPlaying);
    };

    const updateProgress = () => {
        if (audio.current.duration) {
          setTime(audio.current.currentTime);
        }
    };

    useEffect(() => {
        setTime(audio.current.currentTime);
    }, [audio.current.currentTime, time]);

    useEffect(() => {
        getAudio(songId).then(result => audio.current.src = result)
        .catch(error => console.log('Bottombar error: ', error));
    }, []);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);

        audio.current.addEventListener('timeupdate', updateProgress);

        return () => {
            window.removeEventListener('resize', handleResize);
            audio.current.removeEventListener('timeupdate', updateProgress);
        };
    }, []);

    return (
        <div className='post-player'>
            <div dangerouslySetInnerHTML={{ __html: isPlaying ? pauseButtomSVG : playButtonSVG }} onClick={playSound}/>
            <div className='progressBar'>
                <div className='progress' style={{ width: `${width * ((time / audio.current.duration))}px` }}></div>
            </div>
        </div>
    );
};

export default Audiobar;