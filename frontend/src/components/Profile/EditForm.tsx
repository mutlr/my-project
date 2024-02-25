import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { editPostOrComment } from "../../services/postService";
import { Post, EditValues, Comment } from "../../types";
import Button from "../Button/Button";

interface Props {
    item: Post | Comment | null,
    cancel: () => void,
}

const EditForm = ({ item, cancel, ...props }: Props) => {
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

export default EditForm;