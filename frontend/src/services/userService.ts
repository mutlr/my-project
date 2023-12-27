import axios from "axios";
import { LoginValues, RegisterFormValues, UserValues } from "../types";

const baseUrl = 'http://localhost:3001';

export const userLogin = async (values: LoginValues): Promise<UserValues> => {
    const result = await axios.post(`${baseUrl}/login`, values);
    console.log('Result from login: ');
    return result.data;
};

export const userRegister = async (values: RegisterFormValues): Promise<UserValues> => {
    const result = await axios.post(`${baseUrl}/register`, values);
    return result.data;
};