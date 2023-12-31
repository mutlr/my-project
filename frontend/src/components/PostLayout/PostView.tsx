import React from "react";
import Audiobar from "./Audiobar";
import PostHeader from "./PostHeader";
import './PostLayout.css';
interface PostDetails {
    post: {
        user: string,
        song: string,
        artist: string,
        title: string,
        songId: string,
    }
    preview: boolean
}
const PostView = (props: PostDetails) => {
    return (
        <div className='post-container'>
            <PostHeader user={props.post.user} song={props.post.song} artist={props.post.artist} comment={false}/>
            {!props.preview && <div>{props.post.title}</div>}
            <Audiobar songId={props.post.songId} />
        </div>
    );
};

export default PostView;