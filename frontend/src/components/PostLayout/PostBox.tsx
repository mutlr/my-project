import React from "react";
import { Link } from "react-router-dom";
import Audiobar from "./Audiobar";
import PostHeader from "./PostHeader";
import { Post } from "../../types";
import './PostLayout.css';
import Content from "./Content";

interface PostProps {
    post: Post,
    preview: boolean,
}

const PostBox = ({ post, preview }: PostProps) => {
    return (
        <div className="postbox">
        <PostHeader
        user={{ username: post.user.username, id: post.user.id }}
        createdAt={post.createdAt}
        />
        <Link to={`/post/${post.postId}`}>
            <Content 
            title={post.title}
            artist={post.artist.artistName}
            song={post.song.songName}
            songId={post.song.songId}
            id={post.postId}
            description={preview ? null : post.description}
            />
        </Link>
    </div>
    );
};

export default PostBox;