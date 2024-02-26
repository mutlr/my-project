import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import './ProfileHeader.css';
import { UserInfo } from "../../types";
import { MessageContext } from "../../context/messageContext";
interface Props {
    id: number,
}

const ProfileHeader = (props: Props) => {
    const [info, setInfo] = useState<UserInfo | null>(null);
    const message = useContext(MessageContext);

    useEffect(() => {
        axios.get(`http://localhost:3001/spotifyapi/info/${props.id}`)
        .then(result => {
            const data: UserInfo = result.data;
            setInfo(data);
        })
        .catch((error): any => {
            if (axios.isAxiosError(error)) {
                console.log('Error: ', error.response?.data);
                message?.error(error.response?.data.error);
            }
        });
    }, []);
    return (
    <div className="profile-header-container">
        <div className="profile-info">
            <img className="userimage" />
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