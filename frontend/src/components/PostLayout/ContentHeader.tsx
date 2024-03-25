import { Link } from "react-router-dom";
import { User } from "../../types";
import React from "react";
interface Props {
    user: User,
    createdAt: string,
}
const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString().replaceAll('/', '.');
};

const ContentHeader = (props: Props) => {
    return (
        <div className="content-header">
            <Link to={`/profile/${props.user?.id}`}>
                <p>{props.user?.username}</p>
            </Link>
            <p>{formatDate(props.createdAt)}</p>
        </div>
    );
};

export default ContentHeader;