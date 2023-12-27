import React from 'react';
import './Login.css';
import { LoginValues, UserValues } from '../../types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { userLogin } from '../../services/userService';
//import { Link } from "react-router-dom";

interface Props {
    handleUser: (values: UserValues) => void,
}
const Login = (props: Props) => {
    const initialValues: LoginValues = { username: '', password: '' };
    const handleRegister = async (values: LoginValues, actions: any) => {
        try {
            const result = await userLogin(values);
            console.log('Login successfull!!!', result);
            props.handleUser(result);
            actions.resetForm();
        } catch (error) {
            console.log('Error in login: ', error);
        }
    };
    return (
        <div className="form-main">
            <Formik initialValues={initialValues} className="loginForm"
                onSubmit={handleRegister}>

                <Form className="form">

                    <label htmlFor="username">Username</label>
                    <Field type="text" className="formInput"  name="username" />
                    <ErrorMessage name="username" component='div' className="error"/>


                    <label htmlFor="password">Password</label>
                    <Field type="password" className="formInput"   name="password" />
                    <ErrorMessage name="password" component='div' className="error"/>

                    <button type="submit" className="formButton">Sign In</button>
                </Form>
            </Formik>
            <p>Not a user?</p>
        </div>
    );
};

export default Login;