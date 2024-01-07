import React from 'react';
import { Post, } from '../../types';
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