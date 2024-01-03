import React from "react";
import Audiobar from "./Audiobar";
import PostHeader from "./PostHeader";
import { Comment } from "../../types";
import './PostLayout.css';


interface Props {
    comment: Comment,
}
const CommentBox = ({ comment }: Props) => {
    console.log('Comment in commentvox: ', comment);
    return (
        <div className="postbox">
        <PostHeader
            user={comment.user.username}
            song={comment.song.songName}
            artist={comment.artist.artistName}
            title={comment.title}
            createdAt={comment.createdAt} />
        <p className="description">{comment.description}</p>
        <Audiobar songId={comment.song.songId}/>
    </div>
    );
};

export default CommentBox;