import React, { SyntheticEvent, useEffect, } from "react";

import { authenticateSpotify, refreshSpotifyToken, } from "./services/userService";
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:3000/test';
const SCOPE = 'user-read-private user-read-email playlist-modify-public';
const URL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;
const Test = () => {
    const code = new URLSearchParams(window.location.search).get("code");
    useEffect(() => {
        if (code) {
            console.log('Menee tänne iffii cookindaa', code);
            authenticateSpotify(code)
            .then(r => console.log('Result from auth: ', r))
            .catch(e => console.log('Error from auth: ', e));
        }
    }, [code]);

    const handleRefresh = async (e: SyntheticEvent) => {
        e.preventDefault();
        refreshSpotifyToken()
        .then(result => console.log('Result from refreshing token: ', result))
        .catch(error => console.log('Error from refreshing token: ', error));
    };
    return (
        <div>
            <a style={{ color: 'black' }} href={URL}>Click me to, spotify</a>
            <button style={{ color: 'black' }} onClick={handleRefresh}>Click me to, refresh</button>
        </div>
    );
};

export default Test;