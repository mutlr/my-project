import React from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileItems from "./ProfileItems";
import AuthenticationButton from "../SpotifyAuthentication/AuthenticationButton";
import './MyProfile.css';

interface Props {
    id: number | undefined,
    authenticated: boolean | undefined,
}

const MyProfile = ({ id, authenticated }: Props) => {
    if (!id) return null;

    return (
        <>
            <ProfileHeader id={id}/>
            <ProfileItems id={id} isUser={true} />
            {!authenticated && <AuthenticationButton />}
        </>
    );
};

export default MyProfile;