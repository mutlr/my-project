import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Togglable from "../Togglable/Togglable";
import Commentform from "../PostingForms/Commentform";
import { Post, User } from "../../types";
import { getCommentsByID } from "../../services/postService";
import useVisibility from "../../hooks/useVisibility";
import { postMap } from "../../utils/utils";
import PostContainer, { PostComment } from "../PostLayout/PostContainer";
import './PostPage.css';
interface PostPageProps {
    post: Post | null,
    user?: User | undefined | null,
    authenticated: boolean,
}

const PostPage = (props: PostPageProps) => {
    const { id } = useParams();
    const [comments, setComments] = useState<Post[]>([]);
    const { toggleVisibility, isOpen } = useVisibility();
    const addComment = (comment: Post) => {
        setComments(comments.concat(comment));
    };
    useEffect(() => {
        getCommentsByID(Number(id))
        .then(result => {
            setComments(result.map((c: any): Post => postMap(c)));
        }).catch(error => console.log('Error getting comments: ', error));
    }, []);

    if (props.post === null) {
        return null;
    }
    return (
        <>
        {props.user &&
        <Togglable
            buttonText="Comment"
            toggleVisibility={toggleVisibility}
            isOpen={isOpen}>
            <Commentform
                postId={props.post.id}
                toggleVisibility={toggleVisibility}
                addComment={addComment}/>
        </Togglable>}
        <div className="postpage-container">
            <PostContainer post={props.post} preview={false} authenticated={props.authenticated} />
            <p>Comments</p>
            {comments.map(c =>
            <PostComment
                key={c.id}
                post={c}
                authenticated={props.authenticated}
                preview={false}
                />
            )}
        </div>
        </>
    );
};

export default PostPage;