import React from "react";
import { SongEntry, SongListing } from "../../types";
import { Song } from "../SongDetails/SongDetails";
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
            <Song name={s.song.songName} artist={s.artist.artistName} id="3" imageURL={s.image}/>
        </div>
    );
};

export default SongContainer;
