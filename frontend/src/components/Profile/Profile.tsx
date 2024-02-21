import React, { MouseEventHandler, ReactNode, useEffect, useState } from "react";
import './Profile.css';
import { authenticateSpotify } from "../../services/userService";
import axios from 'axios';
import { Post, Comment } from "../../types";
import { commentMap, postMap } from "../../utils/utils";
import PostBox from "../PostLayout/PostBox";
import { getPostsByID, getComments } from "../../services/postService";
import { useParams } from "react-router-dom";
import CommentBox from "../PostLayout/CommentBox";

interface Props {
    id?: number
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
    const changeView = (e: any) => {
        if (isFilter(e)) setFilter(e);
    };

    const layout = (): ReactNode => {
        switch(filter) {
            case Filter.posts:
                return posts.map(post => (
                    <PostBox post={post} preview={true} key={post.postId} />
                ));
            case Filter.comments:
                return comments.map(comment => (
                    <CommentBox comment={comment} key={comment.commentId} />
                ));
            default:
                return null;
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
            <ProfileItems id={Number(id)}/>
        </div>
    );
};

export default Profile;