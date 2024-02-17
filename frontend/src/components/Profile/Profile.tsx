import React, { useEffect, useState } from "react";
import './Profile.css';
import { authenticateSpotify } from "../../services/userService";

type Filters = 'comments' | 'posts' | 'playlists';

interface Props {
    id?: number
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
        <a id="auth-btn" href={URL}>Authenticate Spotify</a>
    );
};
const Profile = (props: Props) => {
    const [filter, setFilter] = useState<Filters>('posts');
    console.log('id: ', props.id);
    const changeView = (e: React.FormEvent<HTMLSelectElement>) => {
        console.log(e.currentTarget.value);
        setFilter(e.currentTarget.value as Filters);
    };
    return (
        <div className="profile-container">
            <div className="profile-info">
                <div className="userimage"></div>
                <h1>Matti Meikäläinen</h1>
                <AuthenticationButton />
            </div>

            <select name="selectedView" defaultValue={filter} className="profile-select" onChange={changeView}>
                <option value='posts'>Posts</option>
                <option value='comments'>Comments</option>
                <option value='playlists'>Playlists</option>
            </select>
            
        </div>
    );
};

export default Profile;