import React, { useContext, useEffect, useState } from "react";
import cat from '../../assets/kitty-cat-kitten-pet-45201.jpeg';
import './Playlist.css';
import Audiobar from "../PostLayout/Audiobar";
import { getPlaylists } from "../../services/apiServices";
import Button from "../Button/Button";
import UserContext from "../../context/userContext";
import usePlaylist from "../../hooks/usePlaylist";
import SongDetails from "../SongDetails/SongDetails";
interface PlaylistItemProps {
    items: Item[],
    addToPlaylist: (songId: string) => void,
    authenticated: boolean,
}
interface Item {
    song_name: string,
    artist: string,
    preview_url: string,
    id: string,
    image_url: string,
}
interface Playlist {
    name: string,
    items: Item[],
}

const PlaylistItems = (props: PlaylistItemProps) => {
    const [amount, setAmount] = useState<number>(5);
    return (
        <div className="playlist-item-container">
            {props.items.map((value, index) => {
                if (index < amount) {
                    return (
                    <div className="playlist-box" key={value.song_name + index}>
                        <SongDetails 
                            name={value.song_name} 
                            artist={value.artist} 
                            id={value.id}
                            imageURL={value.image_url}
                            authenticated={props.authenticated}
                        />
                        <Audiobar songId={value.id}/>
                    </div>
                    );
                }
            })}
            {props.items.length > amount &&
                <Button
                    style={{ marginTop: '0px', padding: '8px 16px' }}
                    text="Load more" color="primary"
                    onClick={() => setAmount(amount + 5)}
                />}
        </div>
    );
};

const Playlist = (props: { id: number}) => {
    const [playlists, setPlaylists] = useState<Playlist[] | null>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const user = useContext(UserContext);
    const addToPlaylist = usePlaylist();
    useEffect(() => {
        getPlaylists(props.id)
        .then(result => {
            console.log('Result playlist haust: ', result);
            if (result === null) {
                setPlaylists(null);
                return;
            }
            setPlaylists(result);
        })
        .catch(err => console.log('Error getting playlists: ', err))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!playlists) return <div>This user has no playlists</div>;

    const addToPlaylistFunc = async (songId: string) => {
        addToPlaylist(songId);
    };
    return (
        <div className="playlist-main-container">
            <div className="playlist-container">
                {playlists.map(p => (
                    <>
                        <p className="playlist-name">{p.name}</p>
                        <PlaylistItems items={p.items} addToPlaylist={addToPlaylistFunc} authenticated={user.authenticated} />
                    </>
                ))}
            </div>
        </div>
    );
};

export default Playlist;