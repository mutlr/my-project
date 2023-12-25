import React from 'react';
import './Login.css';
import { LoginFormValues } from "../../types";
import { Formik, Form, Field, ErrorMessage } from 'formik';
//import { Link } from "react-router-dom";
const Login = () => {
    const initialValues: LoginFormValues = {username: '', password: ''};
    const handleRegister = (values: LoginFormValues) => {
        console.log('Values: ', values );
        alert(JSON.stringify(values, null, 2));
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