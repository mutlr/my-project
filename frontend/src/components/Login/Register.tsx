import React from 'react';
import '../Login/Login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RegisterFormValues } from '../../types';

const validationSchema = Yup.object().shape({
    username: Yup.string().min(4, 'Username min 4 chars').required('Usernaname is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 chars').required('Password is required')
});

const Register: React.FC = () => {
    const initialValues: RegisterFormValues = { username: '', email: '', password: '' };
    const handleRegister = (values: RegisterFormValues) => {
        console.log('Values: ', values );
        alert(JSON.stringify(values, null, 2));
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

                    <button type="submit" className="formButton">Sign Up</button>
                </Form>

            </Formik>
        </div>
    );
};

export default Register;