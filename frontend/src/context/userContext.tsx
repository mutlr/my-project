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
    authenticated: boolean,
    addUserToStorageAndSetUser: (token: string, id: number, authenticated: boolean | null, username: string) => void,
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
        let user;
        let tokenInterval: NodeJS.Timer;
        if (loggedUser) {
            user = JSON.parse(loggedUser);
            setUser({ username: user.username, id: user.id });
            setToken(user.token);
        }
        if (loggedUser && user.authenticated) {
            setAuthenticated(true);
        }

        return () => clearInterval(tokenInterval);
    }, []);

    const addUserToStorageAndSetUser = (token: string, id: number, authenticated: boolean | null, username: string) => {
        setUser({ username, id });
        localStorage.setItem('loggedUser', JSON.stringify({ token, id, username, authenticated }));
        if (authenticated) {
            setAuthenticated(true);
        }
    };
    const refreshToken = () => {
        refreshSpotifyToken()
        .catch(err => {
            console.log('Error from refreshing token: ', err);
            message?.error('Error refreshing spotify token!');
        });
    };

    const login = async (values: LoginValues) => {
        try {
            const result = await userLogin(values);
            const { username, id, token, authenticated } = result;
            addUserToStorageAndSetUser(token, id, authenticated, username);
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
            addUserToStorageAndSetUser(result.token, result.id, false, result.username);
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
            addUserToStorageAndSetUser,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;