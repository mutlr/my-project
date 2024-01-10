import React, { useContext } from "react";
import useSpotifyAuth from "../../hooks/useSpotifyAuth";
import UserContext from "../../context/userContext";

const Render = () => {
    const { state } = useSpotifyAuth();
    return (
        <div>Renderi</div>
    );
};
const Profile = () => {
    const user = useContext(UserContext);
    console.log('User auth: ', user?.authenticated);
    return (
        user?.authenticated ? (
            <div>Bye</div>
        ): (
            <Render />
        )
    );
};

export default Profile;