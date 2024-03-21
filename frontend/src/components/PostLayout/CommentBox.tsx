import React from "react";
import { Comment } from "../../types";
import './PostLayout.css';
import Content from "./Content";
import PostHeader from "./PostHeader";
import Button from "../Button/Button";
import usePlaylist from "../../hooks/usePlaylist";


interface Props {
    comment: Comment,
    authenticated?: boolean,
}
const CommentBox = ({ comment, authenticated }: Props) => {
    const addToPlaylist = usePlaylist();

    return (
        <div className="postbox">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center' }}>
                <PostHeader
                    user={{ username: comment.user.username, id: comment.user.id }}
                    createdAt={comment.createdAt}
                />
                {authenticated && <Button text="+" color="primary"
                    style={{ marginLeft: 'auto', padding: '8px', fontSize: '16px', }}
                    onClick={() => addToPlaylist(comment.song.songId)} />}
            </div>
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