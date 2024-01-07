import React from "react";
import { SongEntry, SongListing } from "../../types";
export interface SongProps {
    s: SongListing,
    chooseSong: (song: SongEntry) => void,
}

const SongContainer = ({ s, chooseSong }: SongProps) => {
    const handlePress = () => {
        chooseSong({
            artist: {
                artistName: s.artist.artistName,
                artistId: s.artist.artistId,
            },
            song: {
                songId: s.song.songId,
                songName: s.song.songName,
            }
        });
    };
    return (
        <div className='song-container' onClick={handlePress}>
            <img src={s.image} className='song-image'/>
            <div className='song-description'>
                <p>{s.song.songName} by {s.artist.artistName}</p>
            </div>
        </div>
    );
};

export default SongContainer;
