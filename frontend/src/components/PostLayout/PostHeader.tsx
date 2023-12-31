import React from "react";
interface PostHeaderProps {
    user: string,
    song: string,
    artist: string,
    comment: boolean
}
const PostHeader = (props: PostHeaderProps) => {
    return (
        <div className='view-top'>
            <div className='top-inner'>
                {props.comment ? 
                <p>I recommend {props.song} by {props.artist}</p> :
                <p>Recomend songs similar to {props.song} by {props.artist}</p>}
                <p>{props.user}</p>
            </div>
    </div>
    );
};

export default PostHeader;