import React from 'react';
import { Post, } from '../../types';
import PostBox from '../PostLayout/PostBox';
import './View.css';

interface Props {
    posts: Post[],
}
const View = (props: Props) => {
    return (
        <div className='frontpage-container' style={{ border: '2px solid red' }}>
            {props.posts.map(post => (
                <PostBox
                post={post}
                preview={true}
                key={post.postId}
                />
            ))}
        </div>
    );
};

export default View;