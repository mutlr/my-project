import React, { useContext } from 'react';
import '../Login/Login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RegisterFormValues } from '../../types';
import Button from '../Button/Button';
import UserContext from '../../context/userContext';
import axios from 'axios';
import { userRegister } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { MessageContext } from '../../context/messageContext';

const validationSchema = Yup.object().shape({
    username: Yup.string().min(4, 'Username min 4 chars').required('Usernaname is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 chars').required('Password is required')
});

const initialValues: RegisterFormValues = { username: '', email: '', password: '' };

const Register = () => {
    const user = useContext(UserContext);
    const message = useContext(MessageContext);
    const navigate = useNavigate();
    const handleRegister = async (values: RegisterFormValues, actions: any) => {
        try {
            const result = await userRegister(values);
            user?.addUserToStorageAndSetUser(result.token, result.id, false, result.username);
            message?.success('Registered successfully!');
            navigate('/');
            actions.resetForm();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                message?.error(error.response?.data.error);
                console.log('Error in login: ', error);
            }
        }
    };
    return (
        <div className="form-main">
            <Formik initialValues={initialValues} className="loginForm"
                validationSchema={validationSchema}
                onSubmit={handleRegister}>
                <Form className="form">

                    <label htmlFor="email">Email</label>
                    <Field type="email" className="formInput" name="email" />
                    <ErrorMessage name="email" component='div' className="error"/>

                    <label htmlFor="username">Username</label>
                    <Field type="text" className="formInput"  name="username" />
                    <ErrorMessage name="username" component='div' className="error"/>


                    <label htmlFor="password">Password</label>
                    <Field type="password" className="formInput"   name="password" />
                    <ErrorMessage name="password" component='div' className="error"/>

                    <Button type="submit" text='Sign Up' color='light' />
                </Form>

            </Formik>
        </div>
    );
};

export default Register;