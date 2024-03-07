import React, { useEffect, useState } from "react";
import cat from '../../assets/kitty-cat-kitten-pet-45201.jpeg';
import './Playlist.css';
import Audiobar from "../PostLayout/Audiobar";
import { getPlaylists } from "../../services/apiServices";
import Button from "../Button/Button";
interface PlaylistItemProps {
    items: Item[]
}
interface Item {
    song_name: string,
    artist: string,
    preview_url: string,
    id: string,
}
interface Playlist {
    name: string,
    items: Item[],
}

const PlaylistItem = (props: PlaylistItemProps) => {
    const [amount, setAmount] = useState<number>(5);
    return (
        <div className="playlist-item-container">
            {props.items.map((value, index) => {
                if (index < amount) {
                    return (
                    <div className="playlist-box" key={value.song_name + index}>
                        <div className="playlist-inner">
                            <img src={cat} style={{ height: '60px', width: '60px' }} className="userimage"/>
                            <div>
                                <p>{value.song_name}</p>
                                <p>{value.artist}</p>
                            </div>
                        </div>
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
    useEffect(() => {
        getPlaylists(props.id)
        .then(result => {
            console.log('Result from playlist: ', result);
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
    return (
        <div className="playlist-main-container">
            <div className="playlist-container">
                {playlists.map(p => (
                    <>
                        <p className="playlist-name">{p.name}</p>
                        <PlaylistItem items={p.items}/>
                    </>

                ))}
            </div>
        </div>
    );
};

export default Playlist;