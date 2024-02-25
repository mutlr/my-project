import React, { useContext, useState, useEffect, ReactNode } from "react";
import { MessageContext } from "../../context/messageContext";
import { getPostsByID, getComments, deletePost, deleteComment } from "../../services/postService";
import { Post, Comment } from "../../types";
import { postMap, commentMap } from "../../utils/utils";
import CommentBox from "../PostLayout/CommentBox";
import PostBox from "../PostLayout/PostBox";
import EditForm from "./EditForm";

interface Props {
    id: number,
    isUser: boolean,
}

enum Filter {
    posts = 'Posts',
    comments = 'Comments',
}

interface Eprops {
    onDelete: () => void,
    onEdit: () => void,
    id: number,
}

const isFilter = (e: any): e is Filter => {
    return Object.values(Filter).includes(e);
};

const EditButtons = ({ onDelete, onEdit, ...props }: Eprops) => {
    return (
        <div className="edit-container">
            <button className="edit-btn" onClick={onEdit}>Edit</button>
            <button className="edit-btn" onClick={onDelete}>Delete</button>
        </div>
    );
};

const ProfileItems = ({ id, isUser, ...props }: Props) => {
    const message = useContext(MessageContext);
    const [filter, setFilter] = useState<Filter>(Filter.posts);
    const [posts, setPosts] = useState<Post[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [editing, setEditing] = useState<boolean>(false);
    const [toEdit, setToEdit] = useState<Post | Comment | null>(null);

    useEffect(() => {
        getPostsByID(Number(id), 'posts')
        .then((result: any) => setPosts(result.map((r: any): Post => postMap(r))))
        .catch(err => console.log('Error getting user posts: ', err));

        getComments(Number(id), 'comments')
        .then(result => setComments(result.map((c: any): Comment => commentMap(c))))
        .catch(err => console.log('Error getting profile comments: ', err));

    }, []);

    const deletePostFunc = async (postId: number) => {
        try {
            const result = await deletePost(postId);
            console.log('Result from deleting post: ', result);
            message?.success('Post deleted successfully!');
        } catch (error) {
            console.log('ERror from deleting post: ', error);

        }
    };

    const deleteCommentFunc = async (commentId: number) => {
        try {
            const result = await deleteComment(commentId);
            console.log('Result from deleting comment: ', result);
            message?.success('Comment deleted successfully!');
        } catch (error) {
            if (error instanceof Error) {
                console.log('ERror from deleting comment: ', error.message);
            }
        }
    };

    const editFunc = (item: Post | Comment) => {
        setEditing(true);
        setToEdit(item);
    };
    const changeView = (e: any) => {
        if (isFilter(e)) setFilter(e);
    };

    const layout = (): ReactNode => {
        switch(filter) {
            case Filter.posts:
                return posts.map(post => (
                    <div key={post.postId}>
                        {isUser && <EditButtons id={id} onDelete={() => deletePostFunc(post.postId)} onEdit={() => editFunc(post)} />}
                        <PostBox post={post} preview={true} />
                    </div>
                ));
            case Filter.comments:
                return comments.map(comment => (
                    <div key={comment.commentId}>
                        {isUser && <EditButtons id={id} onDelete={() => deleteCommentFunc(comment.commentId)} onEdit={() => editFunc(comment)} />}
                        <CommentBox comment={comment} />
                    </div>
                ));
            default:
                return <h1>Tbh, something didnt work as expected</h1>;
        }
    };
    return (
        <div>
            {editing && <EditForm item={toEdit} cancel={() => setEditing(false)}/>}
            <div className="filter-container">
                {Object.values(Filter).map(value => (
                    <button className="filter-item" key={value} onClick={() => changeView(value)}>{value}</button>
                ))}
            </div>
            <div className="profile-items">
                {layout()}
            </div>
        </div>
    );
};

export default ProfileItems;