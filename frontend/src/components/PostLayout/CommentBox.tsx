import React from "react";
import { Comment } from "../../types";
import './PostLayout.css';
import { Link } from "react-router-dom";
import Content from "./Content";
import PostHeader from "./PostHeader";


interface Props {
    comment: Comment,
}
const CommentBox = ({ comment }: Props) => {
    return (
        <div className="postbox">
            <PostHeader
            user={{ username: comment.user.username, id: comment.user.id }}
            createdAt={comment.createdAt}
            />
            <Link to={`/post/${comment.commentId}`}>
                <Content 
                title={comment.title}
                artist={comment.artist.artistName}
                song={comment.song.songName}
                songId={comment.song.songId}
                id={comment.commentId}
                description={comment.description}
                />
            </Link>
    </div>
    );
};

export default CommentBox;