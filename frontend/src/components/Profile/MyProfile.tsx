import React, { useEffect } from "react";
import { authenticateSpotify } from "../../services/userService";
import { ProfileHeader, ProfileItems } from "./Profile";

interface Props {
    id: number | undefined
}

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:3000/profile';
const SCOPE = 'user-read-private user-read-email playlist-modify-public';
const URL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;
const code = new URLSearchParams(window.location.search).get("code");
const AuthenticationButton = () => {
    useEffect(() => {
        if (code) {
            console.log('Menee tänne iffii cookindaa', code);
            authenticateSpotify(code)
            .then(r => console.log('Result from auth: ', r))
            .catch(e => console.log('Error from auth: ', e));
        }
    }, [code]);
    return (
        <div className="auth-btn-container">
            <a id="auth-btn" href={URL}><p>Authenticate Spotify</p></a>
        </div>
    );
};

const MyProfile = ({ id }: Props) => {
    if (!id) return null;

    return (
        <div className="profile-container">
            <div className="myprofile-header">
                <ProfileHeader />
                <AuthenticationButton />
            </div>
            <ProfileItems id={id} />
        </div>
    );
};

export default MyProfile;