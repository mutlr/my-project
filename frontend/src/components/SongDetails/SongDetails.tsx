import React from "react";
import Button from "../Button/Button";
import cat from '../../assets/kitty-cat-kitten-pet-45201.jpeg';
import usePlaylist from "../../hooks/usePlaylist";
interface Props {
    id: string,
    name: string,
    artist: string,
    authenticated?: boolean,
    imageURL?: string,
}
export const Song = ({ name, artist, imageURL }: Props) => {
    return (
        <>
            <img className="song-image" src={imageURL ? imageURL : cat}/>
            <div style={{ display: 'inline-block', width: 'max-content' }}>
                <p>{name}</p>
                <p>{artist}</p>
            </div>
        </>
    );
};

const SongDetails = ({ id, name, artist, authenticated, imageURL }: Props) => {
    const addToPlaylist = usePlaylist();
    return (
        <div className="content-song-container">
            <Song name={name} artist={artist} imageURL={imageURL} id="2" />
            {authenticated && <Button text="+" color="primary"
                onClick={() => addToPlaylist(id)}
            />}
        </div>
    );
};

export default SongDetails;
