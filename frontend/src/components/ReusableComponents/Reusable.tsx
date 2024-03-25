import React from "react";
import { User } from "../../types";
import { Link } from "react-router-dom";
import './Reusable.css';
import cat from '../../assets/kitty-cat-kitten-pet-45201.jpeg';
import Button from "../Button/Button";
import Audiobar from "../PostLayout/Audiobar";
import SongDetails from "../SongDetails/SongDetails";


export const PostInformation = (props: { title: string, description: string, preview: boolean }) => {
    return (
        <div className="post-information">
            <p>{props.title}</p>
            {!props.preview && <p>{props.description}</p>}
        </div>
    );
};

const Reusable = () => {
    return (
        <>
            <div className="content-container">
                <SongDetails name="Gods Plan" artist="Drake" id="hello" authenticated={false} />

                <Audiobar songId="hi"/>
            </div>
        </>
    );
};

export default Reusable;