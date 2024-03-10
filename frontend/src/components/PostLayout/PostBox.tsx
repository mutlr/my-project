import React from "react";
import { Link } from "react-router-dom";
import PostHeader from "./PostHeader";
import { Post } from "../../types";
import './PostLayout.css';
import Content from "./Content";
import Button from "../Button/Button";

interface PostProps {
    post: Post,
    preview: boolean,
}

const PostBox = ({ post, preview }: PostProps) => {
    return (
        <div className="postbox">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center' }}>
                <PostHeader
                    user={{ username: post.user.username, id: post.user.id }}
                    createdAt={post.createdAt}
                />
                <Button text="+" color="primary"
                    style={{ marginLeft: 'auto', padding: '8px', fontSize: '16px', }}
                    onClick={() => console.log('Hello')} />
            </div>
            <Link className="box-link" to={`/post/${post.postId}`}>
                <Content
                    title={post.title}
                    artist={post.artist.artistName}
                    song={post.song.songName}
                    songId={post.song.songId}
                    description={preview ? null : post.description}
                />
            </Link>
        </div>
    );
};

export default PostBox;