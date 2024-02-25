import React from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileItems from "./ProfileItems";
import AuthenticationButton from "../SpotifyAuthentication/AuthenticationButton";

interface Props {
    id: number | undefined,
    authenticated: boolean | undefined,
}

const MyProfile = ({ id, authenticated }: Props) => {
    if (!id) return null;

    return (
        <div className="profile-container">
            <div className="myprofile-header">
                <ProfileHeader />
                {authenticated &&<AuthenticationButton />}
            </div>
            <ProfileItems id={id} isUser={true} />
        </div>
    );
};

export default MyProfile;