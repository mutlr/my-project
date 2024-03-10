import React, { ReactElement, ReactNode, createContext, useState, useEffect, useContext } from "react";
import { User } from "../types";
import { MessageContext } from "./messageContext";
import { useNavigate } from "react-router-dom";
import { setToken } from "../services/serviceUtils";

interface UserContextProps {
    user: User | null,
    logout: () => void,
    authenticated: boolean,
    addUserToStorageAndSetUser: (token: string, id: number, authenticated: boolean, username: string) => void,
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

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

    const addUserToStorageAndSetUser = (token: string, id: number, authenticated: boolean, username: string) => {
        setUser({ username, id });
        localStorage.setItem('loggedUser', JSON.stringify({ token, id, username, authenticated }));
        if (authenticated) {
            setAuthenticated(true);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.clear();
        message?.success('Logged out!');
        navigate('/');
    };

    return (
        <UserContext.Provider
        value={{
            user,
            logout,
            authenticated,
            addUserToStorageAndSetUser,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;