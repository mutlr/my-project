import React, { ChangeEventHandler, useContext, useEffect, useState } from "react";
import useSpotifyAuth from "../../hooks/useSpotifyAuth";
import UserContext from "../../context/userContext";
import { getUserPlaylists } from "../../services/apiServices";
import { logo } from "../../assets/logo";
import axios from "axios";
import { baseUrl } from "../../services/serviceUtils";
type Filters = 'comments' | 'posts' | 'playlists';

interface Props {
    id?: number
}
import './Profile.css';
const Profile = (props: Props) => {
    const [filter, setFilter] = useState<Filters>('posts');
    console.log('id: ', props.id);
    useEffect(() => {
        axios.get(`${baseUrl}/users/${props.id}/${filter}`)
        .then(r => console.log('Result from post: ', r))
        .catch(e => console.log('Error: !!!!!!!', e));
    }, [props.id]);
    /*if (!props.id) {
        return null;
    }*/
    const changeView = (e: React.FormEvent<HTMLSelectElement>) => {
        console.log(e.currentTarget.value);
        setFilter(e.currentTarget.value as Filters);
    };
    return (
        <div className="profile-container">
            <div className="profile-info">
                <div className="userimage"></div>
                <h1>Rojhat Mutlu</h1>
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