import React from "react";
import './Profile.css';
import { useParams } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileItems from "./ProfileItems";

const Profile = () => {
    const { id } = useParams();
    if (!id) return null;

    return (
        <div className="profile-container">
            <ProfileHeader id={Number(id)} />
            <ProfileItems id={Number(id)} isUser={false} />
        </div>
    );
};

export default Profile;