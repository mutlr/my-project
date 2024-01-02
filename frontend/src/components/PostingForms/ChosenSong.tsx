import React from "react";
import { SongEntry } from "../../types";
interface ChosenSongProps {
    song: SongEntry | null
}
const ChosenSong = (props: ChosenSongProps) => {
    if (!props.song) {
        return <div>Choose a song from the list first</div>;
    }
    return (
        <div style={{ color: 'white' }}>
            Song: {props.song.song.songName} by {props.song.artist.artistName}
        </div>
    );
};

export default ChosenSong;