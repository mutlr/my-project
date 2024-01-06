import React, { useContext } from 'react';
import './Login.css';
import { LoginValues, UserValues } from '../../types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { userLogin } from '../../services/userService';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import { MessageContext } from '../../context/messageContext';
import axios from 'axios';
interface Props {
    handleUser: (values: UserValues) => void,
}
const initialValues: LoginValues = { username: '', password: '' };

const Login = (props: Props) => {
    const message = useContext(MessageContext);
    const handleLogin = async (values: LoginValues, actions: any) => {
        try {
            const result = await userLogin(values);
            props.handleUser(result);
            actions.resetForm();
            message?.success('Logged in!');
        } catch (error: unknown) {
            //let message = '';
            if (axios.isAxiosError(error)) {
                message?.error(error.response?.data.error);
                console.log('Error in login: ', error);

            }
        }
    };
    return (
        <div className="form-main">
            <Formik initialValues={initialValues} className="loginForm"
                onSubmit={handleLogin}>

                <Form className="form">

                    <label htmlFor="username">Username</label>
                    <Field type="text" className="formInput"  name="username" />
                    <ErrorMessage name="username" component='div' className="error"/>


                    <label htmlFor="password">Password</label>
                    <Field type="password" className="formInput"   name="password" />
                    <ErrorMessage name="password" component='div' className="error"/>

                    <Button type="submit" text='Sign In' color='light' />
                </Form>
            </Formik>

            <Link to={'/register'}>Not a user? Click here to register</Link>
        </div>
    );
};

export default Login;