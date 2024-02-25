import React, { useContext, useEffect } from "react";
import { MessageContext } from "../../context/messageContext";
import { authenticateSpotify } from "../../services/userService";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:3000/myprofile';
const SCOPE = 'user-read-private user-read-email playlist-modify-public';
const URL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;
const code = new URLSearchParams(window.location.search).get("code");

const AuthenticationButton = () => {
    const message = useContext(MessageContext);
    useEffect(() => {
        if (code) {
            authenticateSpotify(code)
            .then(() => message?.success('Authentication successfull!'))
            .catch(error => {
                console.log('Error during authentication: ', error);
                message?.error('There was an error authenticating. Try again later!');
            });
        }
    }, [code]);
    return (
        <div className="auth-btn-container">
            <a id="auth-btn" href={URL}><p>Authenticate Spotify</p></a>
        </div>
    );
};

export default AuthenticationButton;