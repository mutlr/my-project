import React from 'react';
import { Post } from '../../App';
import './View.css';
import Postform from '../PostingForms/Postform';
import Togglable from '../Togglable/Togglable';
import PostView from '../PostLayout/PostView';
import { Link } from 'react-router-dom';
import PostHeader from '../PostLayout/PostHeader';
import Audiobar from '../PostLayout/Audiobar';

interface Props {
    posts: Post[]
}
const View = (props: Props) => {
    return (
        <>
            {props.posts.map(post => (
                <div className='post-container' key={post.song + post.user} >
                    <Link to={`post/${post.id}`}>
                        <PostHeader song={post.song} user={post.user} artist={post.artist} comment={false}/>
                    </Link>
                    <Audiobar songId={post.songId}/>
                </div>
            ))}
            <Togglable buttonText='Add a post'>
                <Postform />
            </Togglable >
        </>
    );
};

export default View;