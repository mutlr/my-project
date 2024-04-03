import React, { useContext } from 'react';
import '../Login/Login.css';
import * as Yup from 'yup';
import { RegisterFormValues } from '../../types';
import Button from '../Button/Button';
import UserContext from '../../context/userContext';
import axios from 'axios';
import { userRegister } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { MessageContext } from '../../context/messageContext';
import CustomInput from '../CustomInputs/CustomInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const validationSchema = Yup.object().shape({
    username: Yup.string().min(4, 'Username min 4 chars').required('Usernaname is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 chars').required('Password is required')
});

const Register = () => {
    const user = useContext(UserContext);
    const message = useContext(MessageContext);
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterFormValues>({ resolver: yupResolver(validationSchema) });

    const handleRegister = async (values: RegisterFormValues) => {
        try {
            const result = await userRegister(values);
            user?.addUserToStorageAndSetUser(result.token, result.id, false, result.username);
            message?.success('Registered successfully!');
            navigate('/');
            reset();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                message?.error(error.response?.data.error);
                console.log('Error in login: ', error);
            }
        }
    };
    return (
        <div className="form-main">
            <form className="form" onSubmit={handleSubmit(handleRegister)}>
                <CustomInput register={register} name='username' placeholder='Username' errors={errors}/>
                <CustomInput register={register} name='email' placeholder='Email' errors={errors}/>
                <CustomInput register={register} name='password' placeholder='Password' type='password' errors={errors}/>
                <Button type="submit" text='Sign Up' color='light' />
            </form>
        </div>
    );
};

export default Register;