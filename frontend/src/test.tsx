import React, { SyntheticEvent, useEffect } from "react";
import axios from "axios";
import { useSearchParams, } from "react-router-dom";
import spotifyApi from "./services/apiServices";
import { baseUrl } from "./services/serviceUtils";
import { authenticateSpotify, refreshSpotifyToken, sendAuthentication } from "./services/userService";
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || '';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET || '';
const REDIRECT_URI = 'http://localhost:3000/test';
const SCOPE = 'user-read-private user-read-email playlist-modify-public';

const Test = () => {
    const code = new URLSearchParams(window.location.search).get("code");

    const handleClick = async (e: SyntheticEvent) => {
        window.location.replace(`https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`);
    };
    useEffect(() => {
        if (code) {
            console.log('Code: ', code);
            authenticateSpotify(code)
            .then(result => {
                console.log('From spotify: ', result);
                sendAuthentication(result.access_token, result.refresh_token)
                .then(r => console.log('Result from backend: ', r))
                .catch(e => console.log('Error from backend: ', e));
            })
            .catch(error => console.log('Error from authenticating: ', error.response.data));
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
            <button style={{ color: 'black' }} onClick={handleClick}>Click me to, spotify</button>
            <button style={{ color: 'black' }} onClick={handleRefresh}>Click me to, refresh</button>
        </div>
    );
};

export default Test;