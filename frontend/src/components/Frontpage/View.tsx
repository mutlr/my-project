import React, { useRef } from 'react';
import { Post, User, } from '../../types';
import PostBox from '../PostLayout/PostContainer';
import './View.css';
import Postform from '../PostingForms/Postform';
import Togglable, { TogglableProps } from '../Togglable/Togglable';

interface Props {
    posts: Post[],
    authenticated: boolean,
    user?: User | null,
    addToList: (post: Post) => void,
}

const View = (props: Props) => {
    const toggleRef = useRef<TogglableProps>(null);
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
            {props.user &&
            <Togglable ref={toggleRef}
                buttonText='Add a post'>
                <Postform toggleVisibility={() => toggleRef.current?.toggleVisibility()} addToList={props.addToList}/>
            </Togglable >}
        </div>
    );
};

export default View;