import axios from "axios";
import { setIn } from "formik";
import React, { useEffect, useState } from "react";
interface Props {
    id: number,
}
interface Info {
    player: {
        preview_url: string,
        name: string,
        artist: string,
    } | null,
    username: string,
    userInfo: {
        display_name: string,
        uri: string,
        country: string,
    },
}
const ProfileHeader = (props: Props) => {
    const [info, setInfo] = useState<Info | null>(null);
    useEffect(() => {
        axios.get(`http://localhost:3001/spotifyapi/info/${props.id}`)
        .then(result => {
            const data: Info = result.data;
            setInfo(data);
        })
        .catch(error => console.log('Error from header: ', error));
    }, []);

    if (!info) return null;
    
    return (
    <div className="profile-header-container">
        <div className="profile-info">
            <img className="userimage" />
            <div>
                <h2>{info.username}</h2>
                <p>@{info.userInfo.display_name}</p>
            </div>
        </div>
        {info.player && 
        <div className="profile-music-container">
            <p>Currently playing: {info.player.name} by {info.player.artist}</p>
            <audio src={info.player.preview_url} controls preload="auto" className="audio" autoPlay={true} muted={true}></audio>
        </div>
        }
        {!info.player && <p>Currently not playing anything</p>}
    </div>
    );
};
export default ProfileHeader;