import React, { useEffect } from "react";
import { Post, PostBase } from "../../types";
import Button from "../Button/Button";
import { useForm } from "react-hook-form";
import CustomInput from "../CustomInputs/CustomInput";
import CustomTextarea from "../CustomInputs/CustomTextarea";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    title: yup.string().required('Title cannot be empty'),
    description: yup.string().optional(),
});

interface Props {
    item: Post | null,
    cancel: () => void,
    handleEdit: (values: PostBase) => void,
}

const EditForm = ({ item, cancel, handleEdit }: Props) => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<PostBase>({ resolver: yupResolver(schema) });
    useEffect(() => {
        const title = item ? item.title : '';
        const description = item ? item.description : '';
        setValue('title', title);
        setValue('description', description);

        return () => reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item]);
    if (!item) return null;

    const handleChange = async (values: PostBase) => {
        handleEdit(values);
        reset();
    };

    return (
        <div className="post-form-main-container" >
            <form className="post-form" onSubmit={handleSubmit(handleChange)}>
                <CustomInput register={register} name="title" placeholder="Title" errors={errors} />
                <CustomTextarea register={register} name="description" placeholder="Description" errors={errors} />

                <div>
                    <Button text='Cancel' color='red' onClick={cancel} />
                    <Button type='submit' text='Submit' color='light' />
                </div>
            </form>
        </div>
    );
};

export default EditForm;