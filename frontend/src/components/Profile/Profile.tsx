import React, { useContext, useEffect, useState } from "react";
import './Profile.css';
import { useParams } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileItems from "./ProfileItems";
import { getCommentsByID, getPostsByID } from "../../services/postService";
import { Post, PostFromBackend } from "../../types";
import { postMap } from "../../utils/utils";
import PostContainer from "../PostLayout/PostContainer";
import UserContext from "../../context/userContext";

const Profile = () => {
    const { authenticated } = useContext(UserContext);
    const { id } = useParams();
    const [posts, setPosts] = useState<Post[]>([]);
    const [comments, setComments] = useState<Post[]>([]);
    useEffect(() => {
        getPostsByID(Number(id))
            .then((result) => setPosts(result.map((p: PostFromBackend) => postMap(p))))
            .catch(error => console.log('Error getting profile posts', error));
    }, [id]);
    useEffect(() => {
        getCommentsByID(Number(id))
            .then((result) => setComments(result.map((p: PostFromBackend) => postMap(p))))
            .catch(error => console.log('Error getting profile posts', error));
    }, [id]);
    if (!id) return null;
    const postComponents = posts.map(p => {
        return (
            <PostContainer post={p} preview={true} authenticated={authenticated} key={p.id}/>
        );
    });
    const commentComponents = comments.map(c => {
        return (
            <PostContainer post={c} preview={true} authenticated={authenticated} key={c.id}/>
        );
    });
    return (
        <div className="profile-container">
            <ProfileHeader id={Number(id)} />
            <ProfileItems id={Number(id)} posts={postComponents} comments={commentComponents}/>
        </div>
    );
};

export default Profile;