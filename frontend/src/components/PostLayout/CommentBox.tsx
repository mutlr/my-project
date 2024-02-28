import React from "react";
import { Comment } from "../../types";
import './PostLayout.css';
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
            <Content
                title={comment.title}
                artist={comment.artist.artistName}
                song={comment.song.songName}
                songId={comment.song.songId}
                description={comment.description}
            />
    </div>
    );
};

export default CommentBox;