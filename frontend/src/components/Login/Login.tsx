import React, { useContext } from 'react';
import './Login.css';
import { LoginValues } from '../../types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import UserContext from '../../context/userContext';

const initialValues: LoginValues = { username: '', password: '' };

const Login = () => {
    const user = useContext(UserContext);
    const handleLogin = (values: LoginValues, actions: any) => {
        user?.login(values);
        actions.resetForm();
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