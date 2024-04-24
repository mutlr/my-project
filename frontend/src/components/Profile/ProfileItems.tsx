import React, { useState, ReactNode } from "react";
import './ProfileItems.css';
import Playlist from "./Playlist";
interface Props {
    id: number,
    comments: ReactNode,
    posts: ReactNode,
}

enum Filter {
    posts = 'Posts',
    comments = 'Comments',
    playlists = 'Playlists',
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const isFilter = (e: any): e is Filter => {
    return Object.values(Filter).includes(e);
};

const ProfileItems = ({ id, ...props }: Props) => {
    const [filter, setFilter] = useState<Filter>(Filter.posts);

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const changeView = (e: any) => {
        if (isFilter(e)) setFilter(e);
    };

    const layout = (): ReactNode => {
        switch(filter) {
            case Filter.posts:
                return props.posts;
            case Filter.comments:
                return props.comments;
            case Filter.playlists:
                return <Playlist id={id} />;
            default:
                return <h1>Tbh, something didnt work as expected</h1>;
        }
    };
    return (
        <>
            <div className="filter-container">
                {Object.values(Filter).map(value => (
                    <button className={`filter-item ${value === filter ? 'underline' : ''}`}
                        key={value} onClick={() => changeView(value)}>{value}</button>
                ))}
            </div>
            <div className="profile-content-container" >
                {layout()}
            </div>
        </>
    );
};

export default ProfileItems;