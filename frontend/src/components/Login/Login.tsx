import React, { useContext } from 'react';
import './Login.css';
import { LoginValues } from '../../types';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import UserContext from '../../context/userContext';
import axios from 'axios';
import { userLogin } from '../../services/userService';
import { useNavigate } from "react-router-dom";
import { MessageContext } from '../../context/messageContext';
import CustomInput from '../CustomInputs/CustomInput';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form';

const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
});

const Login = () => {
    const user = useContext(UserContext);
    const message = useContext(MessageContext);
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginValues>({ resolver: yupResolver(schema) });
    const handleLogin = async (data: LoginValues) => {
        try {
            const result = await userLogin({ username: data.username, password: data.password });
            const { username, id, token, authenticated } = result;
            console.log('Result from login: ', result);
            user?.addUserToStorageAndSetUser(token, id, authenticated, username);
            message?.success('Logged in!');
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
            <form className="form" onSubmit={handleSubmit(handleLogin)}>
                <CustomInput register={register} name='username' placeholder='Username' errors={errors} />
                <CustomInput register={register} name='password' placeholder='Password' type='password' errors={errors} />
                <Button type="submit" text='Sign In' color='light' />
            </form>
            <Link to={'/register'}>Not a user? Click here to register</Link>
        </div>
    );
};

export default Login;