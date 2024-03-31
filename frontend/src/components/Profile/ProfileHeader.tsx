import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import './ProfileHeader.css';
import { UserInfo } from "../../types";
import { MessageContext } from "../../context/messageContext";
import cat from '../../assets/kitty-cat-kitten-pet-45201.jpeg';
import { userSpotifyData } from "../../services/apiServices";
interface Props {
    id: number,
}

const ProfileHeader = (props: Props) => {
    const [info, setInfo] = useState<UserInfo | null>(null);
    const message = useContext(MessageContext);

    useEffect(() => {
        userSpotifyData(props.id)
        .then(data => setInfo(data))
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        .catch((error): any => {
            if (axios.isAxiosError(error)) {
                console.log('Error: header', error.response?.data.error.message);
                message?.error(error.response?.data.error.message);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (!info) return null;
    return (
    <div className="profile-header-container">
        <div className="profile-info">
            <img className="userimage" src={cat}/>
            <div>
                <h2>{info?.username}</h2>
                {info?.userInfo && <p>@{info?.userInfo.display_name}</p>}
            </div>
        </div>
        {info?.player &&
        <div className="profile-music-container">
            <p>Currently playing: {info.player.name} by {info.player.artist}</p>
            <audio src={info.player.preview_url} controls preload="auto" className="audio" autoPlay={true} muted={true}></audio>
        </div>
        }
    </div>
    );
};
export default ProfileHeader;