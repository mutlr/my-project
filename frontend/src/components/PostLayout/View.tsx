import React, { useEffect, useState } from 'react';
import { playButtonSVG } from '../../assets/playPauseButtons';
import './View.css';

const album = {
    name: 'Song name',
    user: 'User name',
    artist: 'Artist name',
    title: 'Title for post',
};

const BottomBar = () => {
    const [width, setWidth] = useState<number>(0);

    const handleResize = () => {
        const progressBar = document.querySelector('.progressBar') as HTMLDivElement;
        if (progressBar) {
            setWidth(progressBar.clientWidth);
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className='post-player'>
            <div dangerouslySetInnerHTML={{ __html: playButtonSVG }} />
            <div className='progressBar'>
                <div className='progress' style={{ width: `${width * 0.5}px` }}></div>
            </div>
        </div>
    );
};
const PostHeader = () => {
    return (
        <div className='view-top'>
            <p className='title'>{album.title}</p>
            <div className='top-inner'>
                <p>Reccomend songs similar to {album.name} by {album.artist}</p>
                <p>{album.user}</p>
            </div>
    </div>
    );
};
const PostView = () => {
    return (
        <div className='post-main'>
            <PostHeader />
            <BottomBar />
        </div>
    );
};
const View = () => {
    return (
        <div className='main-view'>
            <PostView />
            <PostView />
        </div>
    );
};

export default View;