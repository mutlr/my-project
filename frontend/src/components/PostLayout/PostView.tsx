import React from "react";
import Audiobar from "./Audiobar";
import PostHeader from "./PostHeader";
import './PostLayout.css';
import { Post } from "../../types";
interface PostDetails {
    post: Post,
    preview: boolean,
}
const PostView = (props: PostDetails) => {
    return (
        <div className='post-container'>
            <PostHeader user={props.post.user.username} song={props.post.song.songName} artist={props.post.artist.artistName} comment={false}/>
            {!props.preview && <div>{props.post.title}</div>}
            <Audiobar songId={props.post.song.songId} />
        </div>
    );
};

export default PostView;