import React, { useContext, useEffect } from "react";
import { MessageContext } from "../../context/messageContext";
import { authenticateSpotify } from "../../services/userService";
import './AuthenticationButton.css';
import UserContext from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:3000/myprofile';
const SCOPE = 'user-read-private user-read-email playlist-modify-public user-read-currently-playing';
const URL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;
let code = new URLSearchParams(window.location.search).get("code");

const AuthenticationButton = () => {
    const message = useContext(MessageContext);
    const user = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (code) {
            authenticateSpotify(code)
            .then(r => {
                user?.addUserToStorageAndSetUser(r.token, r.id, true, r.username);
                message?.success('Authentication successfull!');
                navigate('/myprofile');
                code = null;
            })
            .catch(error => {
                console.log('Error during authentication: ', error);
                message?.error('There was an error authenticating. Try again later!');
            });
        }
    }, [code]);
    return (
            <a id="auth" className="btn" href={URL}><p>Authenticate Spotifyy</p></a>
    );
};

export default AuthenticationButton;