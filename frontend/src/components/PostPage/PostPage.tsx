import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Togglable, { TogglableProps } from "../Togglable/Togglable";
import Commentform from "../PostingForms/Commentform";
import { Post, PostFromBackend } from "../../types";
import { getCommentsByID } from "../../services/postService";
import { postMap } from "../../utils/utils";
import PostContainer, { PostComment } from "../PostLayout/PostContainer";
import './PostPage.css';
import userContext from "../../context/userContext";
interface Props {
    post: Post | null,
}

const PostPage = (props: Props) => {
    const { id } = useParams();
    const { authenticated, user } = useContext(userContext);
    const [comments, setComments] = useState<Post[]>([]);
    const toggleRef = useRef<TogglableProps>(null);
    const addComment = (comment: Post) => {
        setComments(comments.concat(comment));
    };
    useEffect(() => {
        getCommentsByID(Number(id))
        .then((result: PostFromBackend[]) => {
            setComments(result.map((c: PostFromBackend): Post => postMap(c)));
        }).catch(error => console.log('Error getting comments: ', error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (props.post === null) {
        return null;
    }
    return (
        <>
            {user &&
            <Togglable ref={toggleRef}
                buttonText="Comment">
                <Commentform
                    postId={props.post.id}
                    toggleVisibility={() => toggleRef.current?.toggleVisibility()}
                    addComment={addComment}/>
            </Togglable>}
            <div className="postpage-container">
                <PostContainer post={props.post} preview={false} authenticated={authenticated} />
                <p>Comments</p>
                {comments.map(c =>
                    <PostComment
                        key={c.id}
                        post={c}
                        authenticated={authenticated}
                        preview={false}
                    />
                )}
            </div>
        </>
    );
};

export default PostPage;