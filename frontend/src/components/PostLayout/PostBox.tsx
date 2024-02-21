import React from "react";
import { Link } from "react-router-dom";
import Audiobar from "./Audiobar";
import PostHeader from "./PostHeader";
import { Post } from "../../types";
import './PostLayout.css';

interface PostProps {
    post: Post,
    preview: boolean,
}

const PostBox = ({ post, preview }: PostProps) => {
    console.log(post.user); 
    return (
        <div className="postbox">
        <Link to={`post/${post.postId}`}>
            <PostHeader
                user={{ username: post.user.username, id: post.user.id }}
                song={post.song.songName}
                artist={post.artist.artistName}
                title={post.title}
                createdAt={post.createdAt} />
        </Link>
        {!preview &&
        <p className="description">{post.description}</p>}
        <Audiobar songId={post.song.songId}/>
    </div>
    );
};

export default PostBox;