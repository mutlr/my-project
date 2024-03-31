import React, { useContext } from "react"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { addToPlaylist } from "../services/apiServices";
import { MessageContext } from "../context/messageContext";

const usePlaylist = () => {
    const message = useContext(MessageContext);
    const addSongToPlaylist = async (songId: string) => {
        try {
            await addToPlaylist(songId);
            message?.success('Song added to Spotify playlist.');
        } catch (error) {
            console.log('Error adding to playlist: ', error);
            message?.error('Something went wrong adding song to playlist');
        }
    };
    return addSongToPlaylist;
};

export default usePlaylist;