import React, { useContext, useState, useEffect, ReactNode } from "react";
import { MessageContext } from "../../context/messageContext";
import { getPostsByID, getComments, deletePost, deleteComment } from "../../services/postService";
import { Post, Comment } from "../../types";
import { postMap, commentMap } from "../../utils/utils";
import CommentBox from "../PostLayout/CommentBox";
import PostBox from "../PostLayout/PostBox";
import EditForm from "../EditForm/EditForm";
import './ProfileItems.css';
import EditButtons from "./EditButtons";
import Playlist from "./Playlist";
import UserContext from "../../context/userContext";

interface Props {
    id: number,
    isUser: boolean,
}

enum Filter {
    posts = 'Posts',
    comments = 'Comments',
    playlists = 'Playlists',
}


const isFilter = (e: any): e is Filter => {
    return Object.values(Filter).includes(e);
};

const ProfileItems = ({ id, isUser, ...props }: Props) => {
    const message = useContext(MessageContext);
    const user = useContext(UserContext);
    const [filter, setFilter] = useState<Filter>(Filter.posts);
    const [posts, setPosts] = useState<Post[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
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
            await deletePost(postId);
            setPosts(posts.filter(post => post.postId !== postId));
            message?.success('Post deleted successfully!');
        } catch (error) {
            console.log('ERror from deleting post: ', error);
        }
    };

    const deleteCommentFunc = async (commentId: number) => {
        try {
            await deleteComment(commentId);
            setComments(comments.filter(com => com.commentId !== commentId));
            message?.success('Comment deleted successfully!');
        } catch (error) {
            if (error instanceof Error) {
                console.log('ERror from deleting comment: ', error.message);
            }
        }
    };

    const editFunc = (item: Post | Comment) => {
        setToEdit(item);
    };
    const changeView = (e: any) => {
        if (isFilter(e)) setFilter(e);
    };

    const layout = (): ReactNode => {
        switch(filter) {
            case Filter.posts:
                return posts.map(post => (
                    <div key={post.postId} className="profile-content">
                        {isUser && <EditButtons id={id} onDelete={() => deletePostFunc(post.postId)} onEdit={() => editFunc(post)} />}
                        <PostBox post={post} preview={true} authenticated={user.authenticated} />
                    </div>
                ));
            case Filter.comments:
                return comments.map(comment => (
                    <div key={comment.commentId} className="profile-content">
                        {isUser && <EditButtons id={id} onDelete={() => deleteCommentFunc(comment.commentId)} onEdit={() => editFunc(comment)} />}
                        <CommentBox comment={comment} authenticated={user.authenticated} />
                    </div>
                ));
            case Filter.playlists:
                return <Playlist id={id} />;
            default:
                return <h1>Tbh, something didnt work as expected</h1>;
        }
    };
    return (
        <>
            {toEdit && <EditForm item={toEdit} cancel={() => setToEdit(null)}/>}
            <div className="filter-container">
                {Object.values(Filter).map(value => (
                    <button className={`filter-item ${value === filter ? 'underline' : ''}`} key={value} onClick={() => changeView(value)}>{value}</button>
                ))}
            </div>
            <div className="profile-content-container">
                {layout()}
            </div>
        </>
    );
};

export default ProfileItems;