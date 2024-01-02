import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../../App";
import PostView from "../PostLayout/PostView";
import axios from "axios";
import PostHeader from "../PostLayout/PostHeader";
import Audiobar from "../PostLayout/Audiobar";
import Togglable from "../Togglable/Togglable";
import Commentform from "../PostingForms/Commentform";
interface PostPageProps {
    post: Post | undefined | null
}
export interface CommentProps {
    comment: {
        text: string,
        username: string,
        song: string,
        artist: string,

    }
}

interface Comment {
    username: string,
    song: string,
    artist: string,
    text: string,
    songId: string,
    commentId: number,
}
const PostPage = (props: PostPageProps) => {
    const { id } = useParams();
    const [comments, setComments] = useState<Comment[]>([]);
    useEffect(() => {
        axios.get(`http://localhost:3001/posts/comments/${id}`)
        .then(result => {
            console.log(result.data.comments);
            const filteredComments = result.data.comments.map((c: any) => {
                return {
                    username: 'Comment',
                    song: c.song.songName,
                    artist: c.song.artist.artistName,
                    text: c.text,
                    songId: c.songId,
                    commentId: c.id,
                };
            });
            setComments(filteredComments);
        }).catch(error => console.log('Error getting comments: ', error));
    }, []);

    if (!props.post) {
        return null;
    }
    return (
        <div>
            <Togglable buttonText="Comment">
                <Commentform postId={props.post.id}/>
            </Togglable>
            <PostView post={props.post} preview={false}/>
            {comments.map(c =>
            <div key={c.commentId} className="post-container">
                <PostHeader user={c.username} song={c.song} artist={c.artist} comment={true}/>
                <p className="comment-text">{c.text}reigjeogejkgjkgjgejioggieogoigoejgiejgejigrejogejeorigjeroijgeroigjeojgoejgoejoiejgeoijgiejgoiejroijegijeio</p>
                <Audiobar  songId={c.songId}/>
            </div>
            )}
        </div>
    );
};

export default PostPage;