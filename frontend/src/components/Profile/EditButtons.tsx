import React from "react";
import './EditButtons.css';

interface Props {
    onDelete: () => void,
    onEdit: () => void,
}

const EditButtons = ({ onDelete, onEdit }: Props) => {
    return (
        <div className="edit-container">
            <button className="delete-btn edit" onClick={onDelete}>Delete</button>
            <button className="edit-btn edit " onClick={onEdit}>Edit</button>
        </div>
    );
};

export default EditButtons;