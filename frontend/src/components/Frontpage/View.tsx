import React, { useState } from 'react';
import Postform from '../PostingForms/Postform';
import Togglable from '../Togglable/Togglable';
import { Link } from 'react-router-dom';
import PostHeader from '../PostLayout/PostHeader';
import Audiobar from '../PostLayout/Audiobar';
import { Post, User } from '../../types';
import useVisibility from '../../hooks/useVisibility';
import PostBox from '../PostLayout/PostBox';

interface Props {
    posts: Post[],
}
const View = (props: Props) => {
    return (
        <>
            {props.posts.map(post => (
            <div className='postpage-container' key={post.postId}>
                <PostBox
                post={post}
                preview={true}/>
            </div>
            ))}
        </>
    );
};

export default View;