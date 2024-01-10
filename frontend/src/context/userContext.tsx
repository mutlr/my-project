import React, { ReactElement, ReactNode, createContext, useState, useEffect, useContext } from "react";
import { LoginValues, RegisterFormValues, User } from "../types";
import { refreshSpotifyToken, userLogin, userRegister } from "../services/userService";
import { MessageContext } from "./messageContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken } from "../services/serviceUtils";
interface UserContextProps {
    user: User | null,
    login: (values: LoginValues) => void,
    logout: () => void,
    register: (values: RegisterFormValues) => void,
    authenticated: boolean
}

const UserContext = createContext<UserContextProps | null>(null);

interface Props {
    children: ReactNode | ReactElement,
}
export const UserProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const message = useContext(MessageContext);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedUser = localStorage.getItem('loggedUser');
        const accessToken = localStorage.getItem('accessToken');
        let tokenInterval: NodeJS.Timer;
        if (loggedUser) {
            const user = JSON.parse(loggedUser);
            setUser({ username: user.username, id: user.id });
            setToken(user.token);
        }
        if (loggedUser && accessToken) {
            refreshToken();
            setAuthenticated(true);
            tokenInterval = setInterval(() => refreshToken(), 3550000);
        }

        return () => clearInterval(tokenInterval);
    }, []);

    const addUserToStorage = (token: string, id: number, accessToken: string | null, username: string) => {
        localStorage.setItem('loggedUser', JSON.stringify({ token, id, username }));
        if (accessToken) {
            setAuthenticated(true);
            localStorage.setItem('accessToken', accessToken);
        }
    };
    const refreshToken = () => {
        refreshSpotifyToken()
        .then(result => localStorage.setItem('accessToken', result.data.accessToken))
        .catch(err => {
            console.log('Error from refreshing token: ', err);
        });
    };

    const login = async (values: LoginValues) => {
        try {
            const result = await userLogin(values);
            console.log('Result from login: ', result);
            setUser({ username: result.username, id: result.id });
            addUserToStorage(result.token, result.id, result.accessToken, result.username);
            message?.success('Logged in!');
            navigate('');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                message?.error(error.response?.data.error);
                console.log('Error in login: ', error);

            }
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.clear();
        message?.success('Logged out!');
        navigate('');
    };

    const register = async (values: RegisterFormValues) => {
        try {
            const result = await userRegister(values);
            setUser({ username: result.username, id: result.id });
            addUserToStorage(result.token, result.id, result.accessToken, result.username);
            message?.success('Registered successfully!');
            navigate('');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                message?.error(error.response?.data.error);
                console.log('Error in login: ', error);

            }
        }
    };
    return (
        <UserContext.Provider
        value={{
            user,
            login,
            logout,
            register,
            authenticated,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;