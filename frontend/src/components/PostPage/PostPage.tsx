import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Togglable from "../Togglable/Togglable";
import Commentform from "../PostingForms/Commentform";
import { Post, Comment, User } from "../../types";
import { getComments } from "../../services/postService";
import useVisibility from "../../hooks/useVisibility";
import PostBox from "../PostLayout/PostBox";
import CommentBox from "../PostLayout/CommentBox";
import { commentMap } from "../../utils/utils";
interface PostPageProps {
    post: Post | undefined | null,
    user: User | undefined | null,
}

const PostPage = (props: PostPageProps) => {
    const { id } = useParams();
    const [comments, setComments] = useState<Comment[]>([]);
    const { toggleVisibility, isOpen } = useVisibility();
    const addComment = (comment: Comment) => {
        setComments(comments.concat(comment));
    };
    useEffect(() => {
        getComments(Number(id))
        .then(result => {
            setComments(result.map((c: any): Comment => commentMap(c)));
        }).catch(error => console.log('Error getting comments: ', error));
    }, []);

    if (!props.post) {
        return null;
    }
    return (
        <div className="postpage-container">
            {props.user &&
            <Togglable
                buttonText="Comment"
                toggleVisibility={toggleVisibility}
                isOpen={isOpen.display}>
                <Commentform
                    postId={props.post.postId}
                    toggleVisibility={toggleVisibility}
                    addComment={addComment}/>
            </Togglable>}
            <PostBox post={props.post} preview={false} />
            {comments.map(c =>
            <CommentBox
                key={c.commentId}
                comment={c}
                />
            )}
        </div>
    );
};

export default PostPage;