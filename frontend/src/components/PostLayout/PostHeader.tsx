import React from "react";
import './Postheader.css';
interface PostHeaderProps {
    user: string,
    song: string,
    artist: string,
    title: string,
    createdAt: string,
}
const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString().replaceAll('/', '.');
};
const PostHeader = (props: PostHeaderProps) => {
    return (
        <div className='postheader-container'>
            <div className='postheader-top'>
                <p>{props.user}</p>
                <p>{formatDate(props.createdAt)}</p>
            </div>
            <p>{props.title}</p>
            <p>{props.song} by {props.artist}</p>
        </div>
    );
};

export default PostHeader;