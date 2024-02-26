import Audiobar from "./Audiobar";
import React from "react";
interface Props {
    title: string,
    description: string | null,
    artist: string,
    song: string,
    songId: string,
    id: number,
}
const Content = (props: Props) => {
    return (
    <div >
        <p>{props.title}</p>
        <p className="description">{props.description}</p>
        <p>{props.song} by {props.artist}</p>
        <Audiobar songId={props.songId}/>
    </div>
    );
};

export default Content;