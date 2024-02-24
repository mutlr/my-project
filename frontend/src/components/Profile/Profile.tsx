import React, { ReactElement, ReactNode, useContext, useEffect, useState } from "react";
import './Profile.css';
import { Post, Comment, EditValues } from "../../types";
import { commentMap, postMap } from "../../utils/utils";
import PostBox from "../PostLayout/PostBox";
import { getPostsByID, getComments, deleteComment, deletePost, editPostOrComment } from "../../services/postService";
import { useParams } from "react-router-dom";
import CommentBox from "../PostLayout/CommentBox";
import { MessageContext } from "../../context/messageContext";
import Togglable from "../Togglable/Togglable";
import useVisibility from "../../hooks/useVisibility";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Button from "../Button/Button";

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
    onDelete: () => void,
    onEdit: () => void,
    id: number,
}
const EditButtons = ({ id, onDelete, ...props }: Eprops) => {

    return (
        <div className="edit-container">
            <button className="edit-btn" onClick={props.onEdit}>Edit</button>
            <button className="edit-btn" onClick={onDelete}>Delete</button>
        </div>
    );
};

interface EditBoxProps {
    item: Post | Comment | null,
    cancel: () => void,
}

const EditBox = ({ item, cancel, ...props }: EditBoxProps) => {
    if (!item) return null;
    const title = item.title ? item.title : '';
    const description = item.description ? item.description : '';
    const handleSubmit = async (values: EditValues) => {

        if ('postId' in item ) {
            editPostOrComment(item.postId, { ...values }, 'post')
            .then(result => console.log('Result from editing post: ', result))
            .catch(error => console.log('Error from editing a post: ', error));
        } else if ('commentId' in item) {
            editPostOrComment(item.commentId, { ...values }, 'comment')
            .then(result => console.log('Result from editing comment: ', result))
            .catch(error => console.log('Error from editing a comment: ', error));        
        }
    };
    return (
        <div className="postform-container" >
            <Formik 
                initialValues={{ title, description }} 
                onSubmit={handleSubmit} 
                enableReinitialize
                className='post-form'
            >
            {({ values }) => (
            <Form className="post-form">

                <div className='input-container'>
                    <label htmlFor="title">Title</label>
                    <Field
                    type="text"
                    name="title"
                    value={values.title}
                    className="formInput"
                    style={{ backgroundColor: 'white' }}
                    />
                </div>
                    <ErrorMessage name="fullname" component="div" />


                <div className='input-container'>
                    <label htmlFor="description">Description</label>
                    <Field
                    type="text"
                    name="description"
                    value={values.description}
                    className="formInput"
                    />
                </div>
                <ErrorMessage name="email" component="div" />
                <div>

                <Button type='button' text='Cancel' color='primary' onClick={cancel} />
                <Button type='submit' text='Submit' color='primary' />
                </div>
            </Form>)}

            </Formik>
        </div>
    );
};
export const ProfileItems = ({ id }: Props) => {
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

    const deletePostFunc = async (id: number) => {
        try {
            const result = await deletePost(id);
            console.log('Result from deleting post: ', result);
            message?.success('Post deleted successfully!');
        } catch (error) {
            console.log('ERror from deleting post: ', error);
            
        }
    };

    const deleteCommentFunc = async (id: number) => {
        try {
            const result = await deleteComment(id);
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
                        <EditButtons id={id} onDelete={() => deletePostFunc(post.postId)} onEdit={() => editFunc(post)} />
                        <PostBox post={post} preview={true} />
                    </div>                
                ));
            case Filter.comments:
                return comments.map(comment => (
                    <div key={comment.commentId}>
                        <EditButtons id={id} onDelete={() => deleteCommentFunc(comment.commentId)} onEdit={() => editFunc(comment)} />
                        <CommentBox comment={comment} />
                    </div>
                ));
            default:
                return <h1>Tbh, something didnt work as expected</h1>;
        }
    };
    return (
        <div>
            {editing && <EditBox item={toEdit} cancel={() => setEditing(false)}/>}
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