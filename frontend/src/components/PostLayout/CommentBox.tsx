import React from "react";
import Audiobar from "./Audiobar";
import PostHeader from "./PostHeader";
import { Comment } from "../../types";
import './PostLayout.css';


interface Props {
    comment: Comment,
}
const CommentBox = ({ comment }: Props) => {
    return (
        <div className="postbox">
        <PostHeader
            user={{ username: comment.user.username, id: comment.user.id }}
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