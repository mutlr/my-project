import React, { useContext, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileItems from "./ProfileItems";
import AuthenticationButton from "../SpotifyAuthentication/AuthenticationButton";
import './MyProfile.css';
import userContext from "../../context/userContext";
import useContentManager from "../../hooks/useContentManager";
import { Post, PostBase } from "../../types";
import PostContainer from "../PostLayout/PostContainer";
import EditButtons from "./EditButtons";
import EditForm from "../EditForm/EditForm";

interface Props {
    handlePostRemove: (id: number) => void,
    handlePostEdit: (post: Post) => void,
}

const MyProfile = (props: Props) => {
    const { authenticated, user } = useContext(userContext);
    const [ posts, postDelete, postEdit ] = useContentManager('posts', Number(user?.id));
    const [ comments, commentDelete, commentEdit ] = useContentManager('comments', Number(user?.id));
    const [toEdit, setToEdit] = useState<Post | null>(null);
    if (!user) return null;

    const handlePostRemoval = (id: number) => {
        postDelete(id);
        props.handlePostRemove(id);
    };
    const postComponents = posts.map(p => {
        return (
            <div className="profile-content" key={p.id}>
                <EditButtons onDelete={() => handlePostRemoval(p.id)} onEdit={() => setToEdit(p)} />
                <PostContainer post={p} preview={true} authenticated={authenticated} />
            </div>
        );
    });
    const commentComponents = comments.map(c => {
        return (
            <div className="profile-content" key={c.id}>
                <EditButtons onDelete={() => commentDelete(c.id)} onEdit={() => setToEdit(c)} />
                <PostContainer post={c} preview={true} authenticated={authenticated} />
            </div>
        );
    });

    const handleEdit = async (values: PostBase) => {
        if (!toEdit) return;
        if (toEdit.postIdInComment) {
            commentEdit(toEdit.id, { ...values })
            .then(() => setToEdit(null))
            .catch(error => console.log('Error from editing a comment: ', error));
        } else {
            postEdit(toEdit.id, { ...values })
            .then((result) => {
                setToEdit(null);
                props.handlePostEdit(result);
            })
            .catch(error => console.log('Error from editing a post: ', error));
        }
    };

    return (
        <>
            <EditForm handleEdit={handleEdit} item={toEdit} cancel={() => setToEdit(null)} />
            <ProfileHeader id={user.id} />
            <ProfileItems id={user.id} posts={postComponents} comments={commentComponents} />
            {!authenticated && <AuthenticationButton />}
        </>
    );
};

export default MyProfile;