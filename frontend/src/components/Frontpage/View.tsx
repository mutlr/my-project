import React from 'react';
import { Post, User, } from '../../types';
import PostBox from '../PostLayout/PostContainer';
import './View.css';
import Postform from '../PostingForms/Postform';
import Togglable from '../Togglable/Togglable';
import useVisibility from '../../hooks/useVisibility';

interface Props {
    posts: Post[],
    authenticated: boolean,
    user?: User | null,
    addToList: (post: Post) => void,
}
const View = (props: Props) => {
    const { toggleVisibility, isOpen } = useVisibility();
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
            <Togglable
                buttonText='Add a post'
                toggleVisibility={toggleVisibility}
                isOpen={isOpen}>
                <Postform toggleVisibility={toggleVisibility} addToList={props.addToList}/>
            </Togglable >}
        </div>
    );
};

export default View;