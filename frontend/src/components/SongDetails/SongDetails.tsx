import React from "react";
import Button from "../Button/Button";
import cat from "../../assets/kitty-cat-kitten-pet-45201.jpeg";
import usePlaylist from "../../hooks/usePlaylist";
interface Props {
  id: string;
  name: string;
  artist: string;
  authenticated?: boolean;
  imageURL?: string;
}

interface SongProps {
  name: string;
  artist: string;
  imageURL?: string;
}
export const Song = ({ name, artist, imageURL }: SongProps) => {
  return (
    <div className="song-box">
      <img className="song-image" src={imageURL ? imageURL : cat} />
      <div className="song-container-test">
        <p className="song-name">{name}</p>
        <p className="song-artist">{artist}</p>
      </div>
    </div>
  );
};

const SongDetails = ({ id, name, artist, authenticated, imageURL }: Props) => {
  const addToPlaylist = usePlaylist();
  return (
    <div className="content-song-container">
      <Song name={name} artist={artist} imageURL={imageURL} />
      {authenticated && (
        <Button
          text="+"
          color="spotifyGreen"
          style={{ padding: "12px 14px" }}
          onClick={() => addToPlaylist(id)}
        />
      )}
    </div>
  );
};

export default SongDetails;
