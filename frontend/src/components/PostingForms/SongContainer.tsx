import React from "react";
import { SongEntry, Song } from "../../types";
export interface SongProps {
    s: Song,
    chooseSong: (song: SongEntry) => void,
}

const SongContainer = ({ s, chooseSong }: SongProps) => {
    const handlePress = () => {
        chooseSong({ artistName: s.artistName, songId: s.songId, artistId: s.artistId, songName: s.songName, });
    };
    return (
        <div className='song-container' onClick={handlePress}>
            <img src={s.image} className='song-image'/>
            <div className='song-description'>
                <p>{s.songName} by {s.artistName}</p>
            </div>
        </div>
    );
};

export default SongContainer;
