import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostView from "../PostLayout/PostView";
import axios from "axios";
import PostHeader from "../PostLayout/PostHeader";
import Audiobar from "../PostLayout/Audiobar";
import Togglable from "../Togglable/Togglable";
import Commentform from "../PostingForms/Commentform";
import { Post, Comment, User } from "../../types";
import { getComments } from "../../services/postService";
import useVisibility from "../../hooks/useVisibility";
interface PostPageProps {
    post: Post | undefined | null,
    user: User | null,
}

const PostPage = (props: PostPageProps) => {
    const { id } = useParams();
    const [comments, setComments] = useState<Comment[]>([]);
    const { toggleVisibility, isOpen } = useVisibility();

    useEffect(() => {
        getComments(Number(id))
        .then(result => {
            setComments(result.map((c: any): Comment => {
                return {
                    user: {
                        username: c.user.username
                    },
                    song: {
                        songName: c.song.songName,
                        songId: c.song.songId
                    },
                    artist: {
                        artistName: c.song.artist.artistName,
                        artistId: c.song.artist.artistId,
                    },
                    commentId: c.id,
                    text: c.text
                };
            }));
        }).catch(error => console.log('Error getting comments: ', error));
    }, []);

    if (!props.post) {
        return null;
    }
    return (
        <div>
            {props.user &&
            <Togglable
                buttonText="Comment"
                toggleVisibility={toggleVisibility}
                isOpen={isOpen.display}>

                <Commentform postId={props.post.postId}/>
            </Togglable>}
            <PostView post={props.post} preview={false}/>
            {comments.map(c =>
            <div key={c.commentId} className="post-container">

                <PostHeader user={c.user.username}
                    song={c.song.songName}
                    artist={c.artist.artistName}
                    comment={true}/>

                <p className="comment-text">{c.text}</p>
                <Audiobar  songId={c.song.songId}/>
            </div>
            )}
        </div>
    );
};

export default PostPage;