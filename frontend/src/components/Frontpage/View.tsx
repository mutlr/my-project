import React from 'react';
import { Post, } from '../../types';
import PostBox from '../PostLayout/PostContainer';
import './View.css';
import usePlaylist from '../../hooks/usePlaylist';

interface Props {
    posts: Post[],
    authenticated: boolean,
}
const View = (props: Props) => {
    return (
        <div className='frontpage-container'>
            {props.posts.map(post => (
                <PostBox
                post={post}
                preview={true}
                key={post.id}
                authenticated={props.authenticated}
                />
            ))}
        </div>
    );
};

export default View;