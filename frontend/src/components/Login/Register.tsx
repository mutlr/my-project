import React from 'react';
import '../Login/Login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RegisterFormValues, UserValues } from '../../types';
import { userRegister } from '../../services/userService';
import Button from '../Button/Button';
const validationSchema = Yup.object().shape({
    username: Yup.string().min(4, 'Username min 4 chars').required('Usernaname is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 chars').required('Password is required')
});

interface Props {
    handleUser: (values: UserValues) => void,
}
const Register = (props: Props) => {
    const initialValues: RegisterFormValues = { username: '', email: '', password: '', name: '' };
    const handleRegister = async (values: RegisterFormValues, actions: any) => {
        try {
            const result = await userRegister(values);
            console.log('Result on register: ', result);
            props.handleUser(result);
            actions.resetForm();
        } catch (error) {
            console.log('Error in register: ', error);
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

                    <label htmlFor="name">Name</label>
                    <Field type="text" className="formInput" name="name" />
                    <ErrorMessage name="name" component='div' className="error"/>

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