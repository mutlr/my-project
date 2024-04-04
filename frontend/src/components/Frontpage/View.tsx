import React, { useContext, useRef } from 'react';
import { Post, } from '../../types';
import PostBox from '../PostLayout/PostContainer';
import './View.css';
import Postform from '../PostingForms/Postform';
import Togglable, { TogglableProps } from '../Togglable/Togglable';
import userContext from '../../context/userContext';

interface Props {
    posts: Post[],
    addToList: (post: Post) => void,
}

const View = (props: Props) => {
    const user = useContext(userContext);
    const toggleRef = useRef<TogglableProps>(null);
    return (
        <div className='frontpage-container'>
            {props.posts.map(post => (
                <PostBox
                post={post}
                preview={true}
                key={post.id}
                authenticated={user.authenticated}
                />
            ))}
            {user.user &&
            <Togglable ref={toggleRef}
                buttonText='Add a post'>
                <Postform toggleVisibility={() => toggleRef.current?.toggleVisibility()} addToList={props.addToList}/>
            </Togglable >}
        </div>
    );
};

export default View;