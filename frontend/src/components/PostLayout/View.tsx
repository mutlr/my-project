import React, { useEffect, useRef, useState } from 'react';
import { playButtonSVG, pauseButtomSVG } from '../../assets/playPauseButtons';
import { Post } from '../../App';
import './View.css';
import axios from 'axios';
import { api } from '../../services/apiServices';
import Postform from '../Postform/Postform';
import Togglable from '../Togglable/Togglable';
const album = {
    name: 'Song name',
    user: 'User name',
    artist: 'Artist name',
    title: 'Title for post',
};

const BottomBar = (props: PostDetails) => {
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
        axios.get(`https://api.spotify.com/v1/tracks/${props.post.songId}`, {
            headers: {
                'Authorization': 'Bearer ' + api
            }
        })
        .then(result => {
            audio.current.src = result.data.preview_url;
        })
        .catch(error => console.log('Bottombar error: ', error));
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
const PostHeader = (props: PostDetails) => {
    return (
        <div className='view-top'>
            <p className='title'>{props.post.title ? props.post.title : album.title}</p>
            <div className='top-inner'>
                <p>Reccomend songs similar to {props.post.song} by {props.post.artist}</p>
                <p>{props.post.user}</p>
            </div>
    </div>
    );
};
interface PostDetails {
    post: {
        user: string,
        song: string,
        artist: string,
        title: string,
        songId: string,
    }
}
const PostView = (props: PostDetails) => {
    return (
        <div className='post-main'>
            <PostHeader post={props.post}/>
            <BottomBar post={props.post} />
        </div>
    );
};

interface Props {
    posts: Post[]
}
const View = (props: Props) => {
    return (
        <div className='main-view'>
            {props.posts.map(post => (
                <PostView post={post} key={post.song + post.artist + post.user}/>
            ))}
            <Togglable buttonText='Add a post'>
                <Postform />
            </Togglable >
        </div>
    );
};

export default View;