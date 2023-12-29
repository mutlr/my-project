import React, { useEffect, useState } from 'react';
import { playButtonSVG } from '../../assets/playPauseButtons';
import { Post } from '../../App';
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
        title: string
    }
}
const PostView = (props: PostDetails) => {
    console.log('Props: ', props.post);
    return (
        <div className='post-main'>
            <PostHeader post={props.post}/>
            <BottomBar />
        </div>
    );
};

interface Props {
    posts: Post[]
}
const View = (props: Props) => {
    console.log('Props: ', props.posts);
    return (
        <div className='main-view'>
            {props.posts.map(post => (
                <PostView post={post} key={post.song + post.artist + post.user}/>
            ))}
        </div>
    );
};

export default View;