import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import './Profile.css';
import { Post, Comment } from "../../types";
import { commentMap, postMap } from "../../utils/utils";
import PostBox from "../PostLayout/PostBox";
import { getPostsByID, getComments, deleteComment, deletePost } from "../../services/postService";
import { useParams } from "react-router-dom";
import CommentBox from "../PostLayout/CommentBox";

interface Props {
    id: number,
}

enum Filter {
    posts = 'Posts',
    comments = 'Comments',
}

export const ProfileHeader = () => {
    return (
    <div className="profile-info">
        <div className="userimage"></div>
        <h1>Matti Meikäläinen</h1>
    </div>
    );
};
const isFilter = (e: any): e is Filter => {
    return Object.values(Filter).includes(e);
};

interface Eprops {
    onClick: () => void,
    id: number,
}
const EditButtons = (props: Eprops) => {

    return (
        <div className="edit-container">
            <button className="edit-btn">Edit</button>
            <button className="edit-btn" onClick={props.onClick}>Delete</button>
        </div>
    );
};
export const ProfileItems = ({ id }: Props) => {
    const [filter, setFilter] = useState<Filter>(Filter.posts);
    const [posts, setPosts] = useState<Post[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        getPostsByID(Number(id), 'posts')
        .then((result: any) => setPosts(result.map((r: any): Post => postMap(r))))
        .catch(err => console.log('Error getting user posts: ', err));

        getComments(Number(id), 'comments')
        .then(result => setComments(result.map((c: any): Comment => commentMap(c))))
        .catch(err => console.log('Error getting profile comments: ', err));
        
    }, []);

    const deletePostFunc = async (id: number) => {
        try {
            const result = await deletePost(id);
            console.log('Result from deleting post: ', result);
        } catch (error) {
            console.log('ERror from deleting post: ', error);
            
        }
    };

    const deleteCommentFunc = async (id: number) => {
        try {
            const result = await deleteComment(id);
            console.log('Result from deleting comment: ', result);
        } catch (error) {
            if (error instanceof Error) {
                console.log('ERror from deleting comment: ', error.message);
            }
        }
    };

    const changeView = (e: any) => {    
        if (isFilter(e)) setFilter(e);
    };

    const layout = (): ReactNode => {
        switch(filter) {
            case Filter.posts:
                return posts.map(post => (
                    <div key={post.postId}>
                        <EditButtons id={id} onClick={() => deletePostFunc(post.postId)} />
                        <PostBox post={post} preview={true} />
                    </div>                
                ));
            case Filter.comments:
                return comments.map(comment => (
                    <div key={comment.commentId}>
                        <EditButtons id={id} onClick={() => deleteCommentFunc(comment.commentId)}/>
                        <CommentBox comment={comment} />
                    </div>
                ));
            default:
                return <h1>Tbh, something didnt work as expected</h1>;
        }
    };
    return (
        <div>
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
const Profile = () => {
    const { id } = useParams();
    if (!id) return null;

    return (
        <div className="profile-container">
            <ProfileHeader />
            <ProfileItems id={Number(id)} />
        </div>
    );
};

export default Profile;