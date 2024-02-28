import React from "react";
import './EditForm.css';

interface Props {
    onDelete: () => void,
    onEdit: () => void,
    id: number,
}

const EditButtons = ({ onDelete, onEdit, ...props }: Props) => {
    return (
        <div className="edit-container">
            <button className="delete-btn edit" onClick={onDelete}>Delete</button>
            <button className="edit-btn edit " onClick={onEdit}>Edit</button>
        </div>
    );
};

export default EditButtons;