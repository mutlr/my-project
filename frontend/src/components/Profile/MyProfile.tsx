import React, { useContext } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileItems from "./ProfileItems";
import AuthenticationButton from "../SpotifyAuthentication/AuthenticationButton";
import './MyProfile.css';
import userContext from "../../context/userContext";


const MyProfile = () => {
    const { authenticated, user } = useContext(userContext);
    if (!user) return null;
    return (
        <>
            <ProfileHeader id={user.id}/>
            <ProfileItems id={user.id} isUser={true} />
            {!authenticated && <AuthenticationButton />}
        </>
    );
};

export default MyProfile;