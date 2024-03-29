import React, { useEffect } from "react";
import { Post, EditValues } from "../../types";
import Button from "../Button/Button";
import { useForm } from "react-hook-form";
import CustomInput from "../CustomInputs/CustomInput";
import CustomTextarea from "../CustomInputs/CustomTextarea";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().optional(),
});

interface Props {
    item: Post | null,
    cancel: () => void,
    handleEdit: (values: EditValues) => void,
}

const EditForm = ({ item, cancel, ...props }: Props) => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<EditValues>({ resolver: yupResolver(schema) });
    useEffect(() => {
        const title = item ? item.title : '';
        const description = item ? item.description : '';
        setValue('title', title);
        setValue('description', description);

        return () => reset();
    }, []);
    if (!item) return null;

    const handleChange = async (values: EditValues) => {
        props.handleEdit(values);
        reset();
    };

    return (
        <div className="post-form-main-container" >
            <form className="post-form" onSubmit={handleSubmit(handleChange)}>
                <CustomInput register={register} name="title" placeholder="Title" errors={errors} />
                <CustomTextarea register={register} name="description" placeholder="Description" errors={errors} />

                <div>
                    <Button type='button' text='Cancel' color='primary' onClick={cancel} />
                    <Button type='submit' text='Submit' color='primary' />
                </div>
            </form>
        </div>
    );
};

export default EditForm;