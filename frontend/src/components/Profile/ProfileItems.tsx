import React, { useContext, useState, ReactNode } from "react";
import { EditValues, Post } from "../../types";
import PostContainer from "../PostLayout/PostContainer";
import EditForm from "../EditForm/EditForm";
import './ProfileItems.css';
import EditButtons from "./EditButtons";
import Playlist from "./Playlist";
import UserContext from "../../context/userContext";
import useContentManager from "../../hooks/useContentManager";

interface Props {
    id: number,
    isUser: boolean,
}

enum Filter {
    posts = 'Posts',
    comments = 'Comments',
    playlists = 'Playlists',
}

interface ProfileContentProps {
    isUser: boolean,
    post: Post,
    edit: (item: Post) => void,
    deletePost: (id: number) => void,
    authenticated: boolean,
}
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const isFilter = (e: any): e is Filter => {
    return Object.values(Filter).includes(e);
};

const ProfileContent = ({ isUser, post, edit, deletePost, authenticated }: ProfileContentProps) => (
    <div className="profile-content">
        {isUser && <EditButtons onDelete={() => deletePost(post.id)} onEdit={() => edit(post)} />}
        <PostContainer post={post} preview={true} authenticated={authenticated} />
    </div>
);
const ProfileItems = ({ id, isUser }: Props) => {
    const user = useContext(UserContext);
    const [filter, setFilter] = useState<Filter>(Filter.posts);
    const [toEdit, setToEdit] = useState<Post | null>(null);
    const [ posts, postDelete, postEdit ] = useContentManager('posts', Number(id));
    const [ comments, commentDelete, commentEdit ] = useContentManager('comments', Number(id));

    const editFunc = (item: Post) => {
        setToEdit(item);
    };

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const changeView = (e: any) => {
        if (isFilter(e)) setFilter(e);
    };

    const handleEdit = async (values: EditValues) => {
        if (!toEdit) return;
        if (toEdit.commentId) {
            commentEdit(toEdit.id, { ...values })
            .then(() => setToEdit(null))
            .catch(error => console.log('Error from editing a comment: ', error));
        } else {
            postEdit(toEdit.id, { ...values })
            .then(() => setToEdit(null))
            .catch(error => console.log('Error from editing a post: ', error));
        }
    };
    const layout = (): ReactNode => {
        switch(filter) {
            case Filter.posts:
                return posts.map(post => (
                        <ProfileContent
                            key={post.id}
                            isUser={isUser}
                            authenticated={user.authenticated}
                            post={post}
                            edit={editFunc}
                            deletePost={postDelete} />
                ));
            case Filter.comments:
                return comments.map(comment => (
                        <ProfileContent
                            key={comment.id}
                            isUser={isUser}
                            authenticated={user.authenticated}
                            post={comment}
                            edit={editFunc}
                            deletePost={commentDelete} />
                ));
            case Filter.playlists:
                return <Playlist id={id} />;
            default:
                return <h1>Tbh, something didnt work as expected</h1>;
        }
    };
    return (
        <>
            {toEdit && <EditForm handleEdit={handleEdit} item={toEdit} cancel={() => setToEdit(null)}/>}
            <div className="filter-container">
                {Object.values(Filter).map(value => (
                    <button className={`filter-item ${value === filter ? 'underline' : ''}`} key={value} onClick={() => changeView(value)}>{value}</button>
                ))}
            </div>
            <div className="profile-content-container" >
                {layout()}
            </div>
        </>
    );
};

export default ProfileItems;