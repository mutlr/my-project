import React from "react";
import './EditButtons.css';
import Button from "../Button/Button";

interface Props {
    onDelete: () => void,
    onEdit: () => void,
}

const EditButtons = ({ onDelete, onEdit }: Props) => {
    return (
        <div className="edit-container">
            <Button className="edit" onClick={onDelete} text="Delete" color="red" />
            <Button className="edit" onClick={onEdit} text="Edit" color="light" />
        </div>
    );
};

export default EditButtons;