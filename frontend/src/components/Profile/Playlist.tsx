import React from "react";
import cat from '../../assets/kitty-cat-kitten-pet-45201.jpeg';
import './Playlist.css';
import Audiobar from "../PostLayout/Audiobar";
const PlaylistItem = () => {
    return (
        <>
            <div className="playlist-inner">
                <img src={cat} style={{ height: '60px', width: '60px' }} className="userimage"/>
                <div>
                    <p>Give Life Back to Music</p>
                    <p>Daft Punk</p>
                </div>
            </div>
            <Audiobar songId="hello"/>
        </>
    );
};
const Playlist = () => {
    return (
        <div className="playlist-main-container">
            <div className="playlist-container">
                <p className="playlist-name">Playlist name</p>
                <PlaylistItem />
                <PlaylistItem />
            </div>
        </div>
    );
};

export default Playlist;