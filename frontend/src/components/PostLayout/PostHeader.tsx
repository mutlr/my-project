import React from "react";
import './Postheader.css';
import { User } from "../../types";
import { useNavigate } from "react-router-dom";

interface PostHeaderProps {
    user: User,
    song: string,
    artist: string,
    title: string,
    createdAt: string,
    id: number
}
const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString().replaceAll('/', '.');
};
const PostHeader = (props: PostHeaderProps) => {
    const navigate = useNavigate();

    const goToProfile = (e: React.SyntheticEvent, id: number | undefined) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/profile/${id}`, { replace: true });
    };

    return (
        <div className='postheader-container'>
            <div className='postheader-top'>
                <p onClick={(e) => goToProfile(e, props.user.id)}>{props.user.username}</p>
                <p>{formatDate(props.createdAt)}</p>
            </div>
            <p>{props.title}</p>
            <p>{props.song} by {props.artist}</p>
        </div>
    );
};

export default PostHeader;