import React, { useState } from 'react';
import './View.css';
import Postform from '../PostingForms/Postform';
import Togglable from '../Togglable/Togglable';
import PostView from '../PostLayout/PostView';
import { Link } from 'react-router-dom';
import PostHeader from '../PostLayout/PostHeader';
import Audiobar from '../PostLayout/Audiobar';
import { Post, User } from '../../types';
import useVisibility from '../../hooks/useVisibility';

interface Props {
    posts: Post[],
    user: User | null,
}
const View = (props: Props) => {
    const { toggleVisibility, isOpen } = useVisibility();

    return (
        <>
            {props.posts.map(post => (
                <div className='post-container' key={post.song.songId + post.user} >
                    <Link to={`post/${post.postId}`}>
                        <PostHeader
                            song={post.song.songName}
                            user={post.user.username}
                            artist={post.artist.artistName}
                            comment={false}/>
                    </Link>
                    <Audiobar songId={post.song.songId}/>
                </div>
            ))}
            {props.user &&
            <Togglable
                buttonText='Add a post'
                toggleVisibility={toggleVisibility}
                isOpen={isOpen.display}>
                <Postform toggleVisibility={toggleVisibility}/>
            </Togglable >}
        </>
    );
};

export default View;